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

import * as Long from 'long';
import { Guid } from 'guid-typescript';
import { Node } from './Node';
import { isDefined } from '@eg/common';

/**
 * The socket index of a socket `Socket`.
 *
 * @export
 * @class SocketIndex
 * @extends {Long}
 */
export class SocketIndex extends Long {}

/**
 * Unique Identifier for a `Socket`.
 *
 * @export
 * @class SocketId
 */
export class SocketId {
  constructor(private readonly _idString: string = Guid.create().toString()) {}
  /**
   * String identifer for this NodeId.
   *
   * @returns {string}
   * @memberof NodeId
   */
  public get string(): string {
    return this._idString;
  }

  public equal(id: SocketId) {
    return this._idString === id._idString;
  }
}

/**
 * Modelclass for a Socket on a node.
 *
 * @export
 * @class Socket
 */
export abstract class Socket {
  protected _id: SocketId = new SocketId();

  constructor(
    public readonly type: Long,
    public readonly name: string,
    public readonly index: SocketIndex,
    protected _parent: Node = undefined
  ) {}

  public get parent(): Node {
    return this._parent;
  }
  public set parent(parent: Node) {
    if (isDefined(this.parent) || !isDefined(parent)) {
      throw 'You cannot assign a new parent or undefined!';
    }
    this._parent = parent;
    // Assign a new unique id to the socket, for debugging purposes
    this._id = this.createId();
  }

  public get id(): SocketId {
    return this._id;
  }
  public get idString(): string {
    return this._id.string;
  }
  protected abstract createId(): SocketId;
}

export type SocketType = 'input' | 'output';

/**
 * The output socket.
 *
 * @export
 * @class InputSocket
 * @extends {Socket}
 */
export class InputSocket extends Socket {
  public readonly kind: SocketType = 'input';
  protected createId(): SocketId {
    return new SocketId(`${this.parent.id.string}-i-${this.index.toInt()}`);
  }
}

/**
 * The input socket.
 *
 * @export
 * @class OutputSocket
 * @extends {Socket}
 */
export class OutputSocket extends Socket {
  public readonly kind: SocketType = 'output';
  protected createId(): SocketId {
    return new SocketId(`${this.parent.id.string}-o-${this.index.toInt()}`);
  }
}

/** Type guard for InputSocket */
export function isInputSocket(socket: InputSocket | OutputSocket): socket is InputSocket {
  return socket.kind === 'input';
}

/** Type guard for OutputSocket */
export function isOutputSocket(socket: InputSocket | OutputSocket): socket is OutputSocket {
  return socket.kind === 'output';
}

/**
 * Creator function for input/output sockets.
 *
 * @export
 * @param {SocketType} kind
 * @param {Long} type
 * @param {string} name
 * @param {SocketIndex} index
 * @param {Node} [parent=undefined]
 * @returns
 */
export function createSocket(kind: SocketType, type: Long, name: string, index: SocketIndex, parent: Node = undefined) {
  switch (kind) {
    case 'input':
      return new InputSocket(type, name, index, parent);
    case 'output':
      return new OutputSocket(type, name, index, parent);
  }
}
