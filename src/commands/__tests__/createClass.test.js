import React from 'react'
import ReactDOMServer from 'react-dom/server'
import PropTypes from 'prop-types'
import createClass from '../createClass'

let klazz

const classSpec = {
  name: 'Greeting',
  props: {
    name: { type: 'string', default: 'Some Value' }
  },
  render:
    ['div', null, 'Hello, world!']
}

function factoryWithRenderSpec (renderSpec) {
  const spec = { ...classSpec, render: renderSpec }
  const { component } = createClass(spec)
  const Factory = React.createFactory(component)
  return Factory
}

describe('createClass', () => {
  describe('basic creation', () => {
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
      expect(klazz.component.propTypes.name).toEqual(PropTypes.string)
    })

    test('implements the render function', () => {
      const Factory = React.createFactory(klazz.component)
      const element = Factory({ name: 'Testing' })
      const str = ReactDOMServer.renderToStaticMarkup(element)
      expect(str).toEqual('<div>Hello, world!</div>')
    })
  })

  describe('rendering', () => {
    test('access props', () => {
      const Factory = factoryWithRenderSpec([
        'div',
        null,
        { type: 'propAccessor', key: 'name' }
      ])
      const element = Factory({ name: 'I am injected from props' })
      const str = ReactDOMServer.renderToStaticMarkup(element)
      expect(str).toEqual('<div>I am injected from props</div>')
    })

    test('access nested props', () => {
      const Factory = factoryWithRenderSpec([
        'div',
        null,
        { type: 'propAccessor', key: ['foo', 'bar'] }
      ])

      const element = Factory({ foo: { bar: 'nested test' } })
      const str = ReactDOMServer.renderToStaticMarkup(element)
      expect(str).toEqual('<div>nested test</div>')
    })

    test('rendering multiple children of different types', () => {
      const Factory = factoryWithRenderSpec([
        'div',
        null,
        'Hello, ',
        { type: 'propAccessor', key: 'name' }
      ])
      const element = Factory({ name: 'John Galt' })
      const str = ReactDOMServer.renderToStaticMarkup(element)
      expect(str).toEqual('<div>Hello, John Galt</div>')
    })

    test('rendering nested children', () => {
      const Factory = factoryWithRenderSpec([
        'div',
        null,
        'Hello, ',
        { type: 'propAccessor', key: 'name' },
        [ 'br' ],
        [
          'div',
          null,
          'You said your name was: ',
          [
            'span',
            null,
            { type: 'propAccessor', key: 'name' },
          ]
        ]
      ])
      const element = Factory({ name: 'John Galt' })
      const str = ReactDOMServer.renderToStaticMarkup(element)
      expect(str).toEqual('<div>Hello, John Galt<br/><div>You said your name was: <span>John Galt</span></div></div>')
    })
  })
})
