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

import { Injectable, Inject } from '@angular/core';
import { GraphManagementService, sz } from './GraphManagementService';
import { flatbuffers } from 'flatbuffers';
import { ILogger, ILoggerFactory } from "@eg/logger"

@Injectable()
export class GraphManagementServiceDummy extends GraphManagementService {

  private logger: ILogger;

  constructor(@Inject("ServiceLoggerFactoryToken") loggerFactory: ILoggerFactory) {
    super();
    this.logger = loggerFactory.create("GeneralInfoServiceBinaryHttp");
  }

  public async addGraph(graphTypeId: string): Promise<string> {
    this.logger.logError(`Not implemented yet!`);
    return "HERE 16byte GUID"
  }

  public async removeGraph(graphId: string): Promise<void> {
    this.logger.logError(`Not implemented yet!`);
  }
}
