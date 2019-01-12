// automatically generated by the FlatBuffers compiler, do not modify

import * as NS17123624684008840155 from "./FileSystemInfo_generated";
/**
 * @constructor
 */
export namespace executionGraphGui.serialization{
export class BrowseRequest {
  bb: flatbuffers.ByteBuffer|null = null;

  bb_pos:number = 0;
/**
 * @param number i
 * @param flatbuffers.ByteBuffer bb
 * @returns BrowseRequest
 */
__init(i:number, bb:flatbuffers.ByteBuffer):BrowseRequest {
  this.bb_pos = i;
  this.bb = bb;
  return this;
};

/**
 * @param flatbuffers.ByteBuffer bb
 * @param BrowseRequest= obj
 * @returns BrowseRequest
 */
static getRootAsBrowseRequest(bb:flatbuffers.ByteBuffer, obj?:BrowseRequest):BrowseRequest {
  return (obj || new BrowseRequest).__init(bb.readInt32(bb.position()) + bb.position(), bb);
};

/**
 * @param flatbuffers.Encoding= optionalEncoding
 * @returns string|Uint8Array|null
 */
path():string|null
path(optionalEncoding:flatbuffers.Encoding):string|Uint8Array|null
path(optionalEncoding?:any):string|Uint8Array|null {
  var offset = this.bb!.__offset(this.bb_pos, 4);
  return offset ? this.bb!.__string(this.bb_pos + offset, optionalEncoding) : null;
};

/**
 * @returns boolean
 */
recursive():boolean {
  var offset = this.bb!.__offset(this.bb_pos, 6);
  return offset ? !!this.bb!.readInt8(this.bb_pos + offset) : false;
};

/**
 * @param flatbuffers.Builder builder
 */
static startBrowseRequest(builder:flatbuffers.Builder) {
  builder.startObject(2);
};

/**
 * @param flatbuffers.Builder builder
 * @param flatbuffers.Offset pathOffset
 */
static addPath(builder:flatbuffers.Builder, pathOffset:flatbuffers.Offset) {
  builder.addFieldOffset(0, pathOffset, 0);
};

/**
 * @param flatbuffers.Builder builder
 * @param boolean recursive
 */
static addRecursive(builder:flatbuffers.Builder, recursive:boolean) {
  builder.addFieldInt8(1, +recursive, +false);
};

/**
 * @param flatbuffers.Builder builder
 * @returns flatbuffers.Offset
 */
static endBrowseRequest(builder:flatbuffers.Builder):flatbuffers.Offset {
  var offset = builder.endObject();
  builder.requiredField(offset, 4); // path
  return offset;
};

}
}
/**
 * @constructor
 */
export namespace executionGraphGui.serialization{
export class BrowseResponse {
  bb: flatbuffers.ByteBuffer|null = null;

  bb_pos:number = 0;
/**
 * @param number i
 * @param flatbuffers.ByteBuffer bb
 * @returns BrowseResponse
 */
__init(i:number, bb:flatbuffers.ByteBuffer):BrowseResponse {
  this.bb_pos = i;
  this.bb = bb;
  return this;
};

/**
 * @param flatbuffers.ByteBuffer bb
 * @param BrowseResponse= obj
 * @returns BrowseResponse
 */
static getRootAsBrowseResponse(bb:flatbuffers.ByteBuffer, obj?:BrowseResponse):BrowseResponse {
  return (obj || new BrowseResponse).__init(bb.readInt32(bb.position()) + bb.position(), bb);
};

/**
 * @param executionGraphGui.serialization.PathInfo= obj
 * @returns executionGraphGui.serialization.PathInfo|null
 */
info(obj?:NS17123624684008840155.executionGraphGui.serialization.PathInfo):NS17123624684008840155.executionGraphGui.serialization.PathInfo|null {
  var offset = this.bb!.__offset(this.bb_pos, 4);
  return offset ? (obj || new NS17123624684008840155.executionGraphGui.serialization.PathInfo).__init(this.bb!.__indirect(this.bb_pos + offset), this.bb!) : null;
};

/**
 * @param flatbuffers.Builder builder
 */
static startBrowseResponse(builder:flatbuffers.Builder) {
  builder.startObject(1);
};

/**
 * @param flatbuffers.Builder builder
 * @param flatbuffers.Offset infoOffset
 */
static addInfo(builder:flatbuffers.Builder, infoOffset:flatbuffers.Offset) {
  builder.addFieldOffset(0, infoOffset, 0);
};

/**
 * @param flatbuffers.Builder builder
 * @returns flatbuffers.Offset
 */
static endBrowseResponse(builder:flatbuffers.Builder):flatbuffers.Offset {
  var offset = builder.endObject();
  builder.requiredField(offset, 4); // info
  return offset;
};

}
}
