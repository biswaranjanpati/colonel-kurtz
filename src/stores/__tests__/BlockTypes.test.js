import React from 'react'
import BlockTypes from '../BlockTypes'

describe('Stores - BlockType', function() {
  let fixture = {
    id        : 'test',
    label     : 'test',
    component : { render() { return (<p/>) }}
  }

  it ('stringifies to a key', function() {
    `${ BlockTypes }`.should.equal('blockTypes')
  })

  it ('ensures a deserialized block type has a react component', function() {
    let blockTypes = BlockTypes.deserialize([fixture])
    blockTypes[0].component.should.be.instanceOf(Function)
  })

  it ('can handle if no blockTypes are given', function() {
    BlockTypes.deserialize().should.be.instanceOf(Array)
  })

  it ('ensures a deserialized block type has a types field', function() {
    let blockTypes = BlockTypes.deserialize([fixture])
    blockTypes[0].should.have.property('types')
  })

})
