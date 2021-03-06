// automatically generated by the FlatBuffers compiler, do not modify

import * as NS11220090238097262337 from "@eg/serialization/SocketLinkDescription_generated";
/**
 * @constructor
 */
export namespace executionGraphGui.serialization{
export class CycleDescription {
  bb: flatbuffers.ByteBuffer|null = null;

  bb_pos:number = 0;
/**
 * @param number i
 * @param flatbuffers.ByteBuffer bb
 * @returns CycleDescription
 */
__init(i:number, bb:flatbuffers.ByteBuffer):CycleDescription {
  this.bb_pos = i;
  this.bb = bb;
  return this;
};

/**
 * @param flatbuffers.ByteBuffer bb
 * @param CycleDescription= obj
 * @returns CycleDescription
 */
static getRootAsCycleDescription(bb:flatbuffers.ByteBuffer, obj?:CycleDescription):CycleDescription {
  return (obj || new CycleDescription).__init(bb.readInt32(bb.position()) + bb.position(), bb);
};

/**
 * @param number index
 * @param executionGraph.serialization.SocketLinkDescription= obj
 * @returns executionGraph.serialization.SocketLinkDescription
 */
cyclePath(index: number, obj?:NS11220090238097262337.executionGraph.serialization.SocketLinkDescription):NS11220090238097262337.executionGraph.serialization.SocketLinkDescription|null {
  var offset = this.bb!.__offset(this.bb_pos, 4);
  return offset ? (obj || new NS11220090238097262337.executionGraph.serialization.SocketLinkDescription).__init(this.bb!.__vector(this.bb_pos + offset) + index * 40, this.bb!) : null;
};

/**
 * @returns number
 */
cyclePathLength():number {
  var offset = this.bb!.__offset(this.bb_pos, 4);
  return offset ? this.bb!.__vector_len(this.bb_pos + offset) : 0;
};

/**
 * @param flatbuffers.Builder builder
 */
static startCycleDescription(builder:flatbuffers.Builder) {
  builder.startObject(1);
};

/**
 * @param flatbuffers.Builder builder
 * @param flatbuffers.Offset cyclePathOffset
 */
static addCyclePath(builder:flatbuffers.Builder, cyclePathOffset:flatbuffers.Offset) {
  builder.addFieldOffset(0, cyclePathOffset, 0);
};

/**
 * @param flatbuffers.Builder builder
 * @param number numElems
 */
static startCyclePathVector(builder:flatbuffers.Builder, numElems:number) {
  builder.startVector(40, numElems, 8);
};

/**
 * @param flatbuffers.Builder builder
 * @returns flatbuffers.Offset
 */
static endCycleDescription(builder:flatbuffers.Builder):flatbuffers.Offset {
  var offset = builder.endObject();
  builder.requiredField(offset, 4); // cyclePath
  return offset;
};

static createCycleDescription(builder:flatbuffers.Builder, cyclePathOffset:flatbuffers.Offset):flatbuffers.Offset {
  CycleDescription.startCycleDescription(builder);
  CycleDescription.addCyclePath(builder, cyclePathOffset);
  return CycleDescription.endCycleDescription(builder);
}
}
}
