import React from 'react'
import ReactDOMServer from 'react-dom/server'
import PropTypes from 'prop-types'
import createClass from '../createClass'

describe('createClass', () => {
  let klazz

  const classSpec = {
    name: 'Greeting',
    props: {
      name: { type: 'string', default: 'Some Value', required: true }
    },
    render:
      ['div', null, 'Hello, world!']
  }

  beforeEach(() => {
    klazz = createClass(classSpec)
  })

  test('create a class object', () => {
    expect(klazz).toBeDefined()
  })

  test('contain the original spec', () => {
    expect(klazz.spec).toBeDefined()
    expect(klazz.spec.name).toEqual('Greeting')
  })

  test('contain the actual React component', () => {
    expect(klazz.component).toBeDefined()
    const Factory = React.createFactory(klazz.component)
    const element = Factory({ name: 'Testing' })
    expect(React.isValidElement(element)).toBe(true)
  })

  test('add the appropriate propTypes to the React class', () => {
    expect(klazz.component.propTypes.name).toEqual(PropTypes.string.isRequired)
  })

  test('implements the render function', () => {
    const Factory = React.createFactory(klazz.component)
    const element = Factory({ name: 'Testing' })
    const str = ReactDOMServer.renderToStaticMarkup(element)
    expect(str).toEqual('<div>Hello, world!</div>')
  })
})
