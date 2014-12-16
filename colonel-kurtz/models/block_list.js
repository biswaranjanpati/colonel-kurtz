/* @flow */
var uid = require('../utils/uid')

class BlockList {
  blockId: number;
  editorId: number;
  id: number;
  _blocks: Array<number>;

  constructor(params: { editorId: number; blockId: number }) {
    this.editorId = params.editorId
    this.blockId = params.blockId
    this.id      = uid()
    this._blocks = []
  }

  all(): Array {
    return this._blocks
  }

  has(id) {
    return this.indexOf(id) > -1
  }

  indexOf(id) {
    return this._blocks.indexOf(id)
  }

  removeBlock(blockId:number): void {
    this._blocks = this._blocks.filter(id => id !== blockId)
  }

  insertBlock(blockId:number, position:number): void {
    this._blocks.splice(position, 0, blockId)
  }

  move(anchorId:number, focusId:number): void {
    var from = this.indexOf(anchorId)
    var to   = this.indexOf(focusId)

    this._blocks.splice(to, 0, this._blocks.splice(from, 1)[0]);
  }

  toJSON(): Object {
    // Note: This is to get around circular dependency issues
    var Block = require('../stores/block_store')

    return this.all().map(Block.find).filter(Boolean).map(b => b.toJSON())
  }

}

module.exports = BlockList
