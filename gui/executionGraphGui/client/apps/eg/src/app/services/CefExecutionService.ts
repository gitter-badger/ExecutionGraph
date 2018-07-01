import { Injectable } from '@angular/core';
import { ExecutionService } from './ExecutionService';
import { CefMessageRouterService } from './CefMessageRouterService';
import { CefBinaryRouterService } from './CefBinaryRouterService';

@Injectable()
export class CefExecutionService extends ExecutionService {
  constructor(private readonly messageRouter: CefBinaryRouterService) {
    super();
  }

  public execute(): Promise<void> {
    return this.messageRouter.execute('general/dummyRequest', {
      payload: {
        number: 12,
        string: 'gugus'
      }
    });
  }
}