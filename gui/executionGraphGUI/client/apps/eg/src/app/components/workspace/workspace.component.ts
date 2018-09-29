// =========================================================================================
//  ExecutionGraph
//  Copyright (C) 2014 by Gabriel Nützi <gnuetzi (at) gmail (døt) com>
//
//  @date Sun Jul 29 2018
//  @author Simon Spoerri, simon (døt) spoerri (at) gmail (døt) com
//
//  This Source Code Form is subject to the terms of the Mozilla Public
//  License, v. 2.0. If a copy of the MPL was not distributed with this
//  file, You can obtain one at http://mozilla.org/MPL/2.0/.
// =========================================================================================

import { Component, OnInit, ElementRef, HostListener, Injectable, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { tap, filter } from 'rxjs/operators';
import { Store } from '@ngrx/store';

import {
  Graph,
  Node,
  Connection,
  SocketIndex,
  InputSocket,
  OutputSocket,
  createConnection,
  isOutputSocket
} from '../../model';
import { AppState } from '../../+state/app.state';
import { appQuery } from '../../+state/app.selectors';
import { AddConnection, MoveNode } from '../../+state/app.actions';

import { ILogger, LoggerFactory } from '@eg/logger';
import { Point, DragEvent } from '@eg/graph';
import { isDefined } from '@eg/common';

@Injectable()
@Component({
  selector: 'eg-workspace',
  templateUrl: './workspace.component.html',
  styleUrls: ['./workspace.component.scss']
})
export class WorkspaceComponent implements OnInit {
  private logger: ILogger;

  public readonly graph: Observable<Graph>;
  public newTargetSocket: InputSocket | OutputSocket = null;
  public newConnection: Connection = null;
  public newConnectionEndpoint: Point = { x: 0, y: 0 };

  constructor(private store: Store<AppState>, private elementRef: ElementRef, loggerFactory: LoggerFactory) {
    this.logger = loggerFactory.create('Workspace');
    this.graph = store.select(appQuery.getSelectedGraph).pipe(filter(g => isDefined(g)));

    this.graph.subscribe(g => this.logger.debug(`Displaying graph ${g.id}`));
  }

  ngOnInit() {}

  public updateNodePosition(node: Node, event: DragEvent) {
    // this.logger.info(`[WorkspaceComponent] Updating node position to ${position.x}:${position.y}`);
    this.store.dispatch(new MoveNode(node, { x: event.dragElementPosition.x, y: event.dragElementPosition.y }));
  }

  public initConnectionFrom(socket: OutputSocket | InputSocket, event: DragEvent) {
    this.logger.info(`[WorkspaceComponent] Initiating new connection from ${socket.idString}`);
    if (isOutputSocket(socket)) {
      this.newTargetSocket = new InputSocket(socket.type, socket.name, new SocketIndex(0));
    } else {
      this.newTargetSocket = new OutputSocket(socket.type, socket.name, new SocketIndex(0));
    }
    // Create the connection
    this.newConnection = createConnection(socket, this.newTargetSocket);

    this.newConnectionEndpoint = {
      x: event.dragElementPosition.x + event.mouseToElementOffset.x,
      y: event.dragElementPosition.y + event.mouseToElementOffset.y
    };
  }

  public movingConnection(event: DragEvent) {
    this.newConnectionEndpoint = {
      x: event.dragElementPosition.x + event.mouseToElementOffset.x,
      y: event.dragElementPosition.y + event.mouseToElementOffset.y
    };
    //this.logger.debug(`Setting position to ${this.newConnectionEndpoint.x}:${this.newConnectionEndpoint.y}`);
  }

  public abortConnection() {
    this.newConnection = null;
  }

  public addConnection(source: OutputSocket | InputSocket, target: OutputSocket | InputSocket) {
    // Create the connection
    this.store.dispatch(new AddConnection(source, target));
  }

  public isOutputSocket(socket: InputSocket | OutputSocket): socket is OutputSocket {
    return isOutputSocket(socket);
  }

  public isInputSocket(socket: InputSocket | OutputSocket): socket is InputSocket {
    return !isOutputSocket(socket);
  }
}
