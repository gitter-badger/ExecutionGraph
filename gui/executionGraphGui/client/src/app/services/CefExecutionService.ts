import { Injectable } from '@angular/core';
import { ExecutionService } from './ExecutionService';
import { CefMessageRouterService } from './CefMessageRouterService';

@Injectable()
export class CefExecutionService extends ExecutionService {

    constructor(
        private readonly messageRouter: CefMessageRouterService
    ) {
        super();
    }

    public execute(): Promise<void> {
        return this.messageRouter.execute("executeGraph",
            {
                "payload": {
                    "graphId": 12,
                    "args": [1, 2, 3]
                }
            });
    }
}