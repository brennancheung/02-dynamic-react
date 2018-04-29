import React from 'react'
import createReactClass from 'create-react-class'
import propSpecToTypes from '../helpers/propSpecToTypes'

function walkArray (arr) {
  const [type, props=null, children] = arr
  return React.createElement(type, props, walkRenderNode(children))
}

function walkRenderNode (node) {
  if (node instanceof Array) {
    return walkArray(node)
  }
  return node
}

function createRenderFunc (renderTree) {
  return function () {
    return walkRenderNode(renderTree)
  }
}

function createClass (spec) {
  const { name, props, render } = spec
  if (!name) {
    throw new Error('createClass: name is required')
  }

  // This gets fed to createReactClass
  let reactSpec = {
    render: createRenderFunc(render)
  }

  if (spec.props) {
    // getDefaultProps

    // propTypes
    const propTypes = propSpecToTypes(props)
    if (propTypes) {
      reactSpec.propTypes = propTypes
    }
  }

  let component = createReactClass(reactSpec)

  return {
    component,
    spec,
  }
}

export default createClass
