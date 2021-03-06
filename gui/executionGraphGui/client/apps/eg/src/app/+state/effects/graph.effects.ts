import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot } from '@angular/router';
import { Store } from '@ngrx/store';
import { Effect, Actions } from '@ngrx/effects';
import { ROUTER_NAVIGATION, RouterNavigationAction } from '@ngrx/router-store';

import { of, from, Observable, merge as mergeObservables, throwError } from 'rxjs';
import { map, tap, catchError, filter, withLatestFrom, mergeMap } from 'rxjs/operators';

import { Id } from '@eg/common';
import { LoggerFactory, ILogger } from '@eg/logger';

import * as fromGraph from '../actions/graph.actions';
import * as fromNotifications from '../actions/notification.actions';

import { Node } from '../../model';
import { GeneralInfoService, GraphManipulationService, GraphManagementService } from '../../services';
import { GraphsState } from '../reducers';
import { RouterStateUrl } from '../reducers/app.reducers';
import { arraysEqual, isDefined } from '@eg/common';
import { AutoLayoutService } from '../../services/AutoLayoutService';
import { Point } from '@eg/graph/src';

@Injectable()
export class GraphEffects {
  private readonly log: ILogger;

  constructor(
    private actions$: Actions,
    private readonly router: Router,
    private readonly store: Store<GraphsState>,
    private readonly generalInfoService: GeneralInfoService,
    private readonly graphManipulationService: GraphManipulationService,
    private readonly graphManagementService: GraphManagementService,
    private readonly autoLayoutService: AutoLayoutService,
    loggerFactory: LoggerFactory
  ) {
    this.log = loggerFactory.create('AppEffects');
  }

  @Effect()
  loadGraphs$ = this.actions$.ofType<fromGraph.LoadGraphs>(fromGraph.LOAD_GRAPHS).pipe(
    mergeMap((action, state) => this.createScrambledGraph()),
    catchError(error => {
      this.log.error(`Failed to load graphs`, error);
      return of(new fromGraph.GraphLoadError(error));
    })
  );

  @Effect()
  openingGraph$ = this.handleNavigation('graph/:graphId', (r, state) =>
    of(new fromGraph.OpenGraph(new Id(r.params.graphId)))
  );

  @Effect({ dispatch: false })
  openGraph$ = this.actions$
    .ofType<fromGraph.GraphAdded>(fromGraph.GRAPH_ADDED)
    .pipe(tap(action => this.router.navigate(['graph', action.graph.id.toString()])));

  @Effect()
  createGraph$ = this.actions$.ofType<fromGraph.CreateGraph>(fromGraph.CREATE_GRAPH).pipe(
    mergeMap((action, state) => from(this.graphManagementService.addGraph(action.graphType.id))),
    mergeMap(graph => [
      //@todo gabnue->gabnue Change here the name of the graph to some default value
      // dispatch new action fromGraph.GraphChangeProps(name: "...");
      new fromGraph.GraphAdded(graph),
      new fromNotifications.ShowNotification(`Shiny new graph created for you 👾`)
    ])
  );

  @Effect()
  createNode$ = this.actions$.ofType<fromGraph.AddNode>(fromGraph.ADD_NODE).pipe(
    mergeMap((action, state) =>
      from(this.graphManipulationService.addNode(action.graphId, action.nodeType.type, 'Node')).pipe(
        map(node => ({ node, action }))
      )
    ),
    mergeMap(({ node, action }) => [
      new fromGraph.NodeAdded(action.graphId, node),
      new fromGraph.MoveNode(node, action.position ? action.position : Point.zero.copy()),
      new fromNotifications.ShowNotification(`Added the node '${node.name}' for you 👾`)
    ])
  );

  @Effect()
  moveNode$ = this.actions$.ofType<fromGraph.MoveNode>(fromGraph.MOVE_NODE).pipe(
    // tap(action => console.log('moving node ', action.node, action.newPosition)),
    tap(action => {
      action.node.uiProps.position = action.newPosition.copy();
    }),
    map((action, state) => new fromGraph.NodesMoved())
  );

  @Effect()
  moveNodes$ = this.actions$.ofType<fromGraph.MoveNodes>(fromGraph.MOVE_NODES).pipe(
    // tap(action => console.log('moving node ', action.node, action.newPosition)),
    tap(action => {
      action.moves.forEach(m => (m.node.uiProps.position = m.pos.copy()));
    }),
    // no real action to dispatch
    map((action, state) => new fromGraph.NodesMoved())
  );

  @Effect()
  removeNode$ = this.actions$.ofType<fromGraph.RemoveNode>(fromGraph.REMOVE_NODE).pipe(
    mergeMap(action =>
      from(this.graphManipulationService.removeNode(action.graphId, action.nodeId)).pipe(map(() => action))
    ),
    mergeMap(action => [
      new fromGraph.NodeRemoved(action.graphId, action.nodeId),
      new fromNotifications.ShowNotification(`Removed the node for you 👾`)
    ])
  );

  @Effect()
  addConnection$ = this.actions$.ofType<fromGraph.AddConnection>(fromGraph.ADD_CONNECTION).pipe(
    mergeMap(action =>
      from(
        this.graphManipulationService.addConnection(action.graphId, action.source, action.target, action.cycleDetection)
      ).pipe(map(conn => ({ conn, action })))
    ),
    map(({ conn, action }) => {
      return new fromGraph.ConnectionAdded(action.graphId, conn);
    }),
    catchError((error, caught) => {
      this.store.dispatch(new fromNotifications.ShowNotification(`Adding connection failed!: ${error}`, 5000));
      return caught;
    })
  );

  @Effect()
  layoutGraph$ = this.actions$.ofType<fromGraph.RunAutoLayout>(fromGraph.RUN_AUTO_LAYOUT).pipe(
    mergeMap(action => from(this.autoLayoutService.layoutGraph(action.graph, action.config))),
    catchError((error, caught) => {
      this.store.dispatch(
        new fromNotifications.ShowNotification(
          'Ups, auto-layouting algorithm crashed. Sorry for the remaining noddle soup. 💣'
        )
      );
      return caught;
    }),
    map(() => new fromNotifications.ShowNotification('Tidied up the noddle soup only for you. 🍝'))
  );

  private async createDummyGraph(): Promise<fromGraph.GraphsLoaded> {
    // Get Graph Infos
    const graphDescs = await this.generalInfoService.getAllGraphTypeDescriptions();
    const graphDesc = graphDescs[0];
    const graphTypeId = graphDesc.id;
    const nodeType = graphDesc.nodeTypeDescriptions[0].type;

    // Add a graph
    let graph = await this.graphManagementService.addGraph(graphTypeId);
    const nodes = {};
    // Add nodes
    let lastNode: Node = null;
    const connections = {};
    for (let i = 0; i < 3; ++i) {
      const node = await this.graphManipulationService.addNode(graph.id, nodeType, `Node ${i}`);
      node.uiProps.position.x = 200 * i;
      node.uiProps.position.y = 50 + 100 * i;
      nodes[node.id.toString()] = node;

      if (lastNode && isDefined(node.inputs[0])) {
        const connection = await this.graphManipulationService.addConnection(
          graph.id,
          lastNode.outputs[0],
          node.inputs[0],
          false
        );
        connections[connection.idString] = connection;
      }
      lastNode = node;
    }

    graph = { ...graph, nodes: nodes, connections: connections, name: 'MyDummyGraph' };

    return new fromGraph.GraphsLoaded([graph]);
  }

  private async createScrambledGraph(): Promise<fromGraph.GraphsLoaded> {
    // Get Graph Infos
    const graphDescs = await this.generalInfoService.getAllGraphTypeDescriptions();
    const graphDesc = graphDescs[0];
    const graphTypeId = graphDesc.id;
    const nodeType = graphDesc.nodeTypeDescriptions[3].type;

    // Add a graph
    let graph = await this.graphManagementService.addGraph(graphTypeId);
    const nodes = {};
    // Add nodes
    let lastNode: Node = null;
    const connections = {};
    for (let i = 0; i < 3; ++i) {
      const node = await this.graphManipulationService.addNode(graph.id, nodeType, `Node ${i}`);
      node.uiProps.position.x = 200 * i;
      node.uiProps.position.y = 50 + 100 * i;
      nodes[node.id.toString()] = node;

      if (lastNode && isDefined(node.inputs[0])) {
        const connection = await this.graphManipulationService.addConnection(
          graph.id,
          lastNode.outputs[0],
          node.inputs[0],
          false
        );
        connections[connection.idString] = connection;
      }
      lastNode = node;
    }

    graph = { ...graph, nodes: nodes, connections: connections, name: 'MyDummyGraph' };

    return new fromGraph.GraphsLoaded([graph]);
  }

  private handleNavigation(path: string, callback: (a: RouterStateUrl, state: GraphsState) => Observable<any>) {
    const segments = path.split('/').map(s => s.trim());

    return this.actions$.ofType<RouterNavigationAction<RouterStateUrl>>(ROUTER_NAVIGATION).pipe(
      map(r => r.payload.routerState),
      filter(r => r && arraysEqual(r.primaryRouteSegments, segments)),
      withLatestFrom(this.store),
      //tap(([r, state]) => console.log(`Handling navigation`)))
      mergeMap(([r, state]) => callback(r, state)),
      catchError(error => {
        this.log.error(`Failed to navigate`, error);
        return of();
      })
    );
  }
}
