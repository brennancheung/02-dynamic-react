import React from 'react'
import createReactClass from 'create-react-class'
import propSpecToTypes from '../helpers/propSpecToTypes'

const memberExpression = (obj, keys) => {
  if (typeof keys === 'string') {
    return obj[keys]
  }
  if (keys instanceof Array) {
    const [ head, ...tail ] = keys
    const newObj = obj[head]

    if (tail.length > 0) {
      return memberExpression(newObj, tail)
    }

    return newObj
  }
}
function walkArray (arr, instance) {
  const [type, props=null, children] = arr
  return React.createElement(type, props, walkRenderNode(children, instance))
}

function walkRenderNode (node, instance) {
  if (node instanceof Array) {
    return walkArray(node, instance)
  }
  if (node instanceof Object && node.type) {
    if (node.type === 'propAccessor') {
      return memberExpression(instance.props, node.key)
    }
  }
  return node
}

function createRenderFunc (renderTree) {
  return function () {
    return walkRenderNode(renderTree, this)
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
