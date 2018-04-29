import React, { Component } from 'react'
import './App.css'
import createReactClass from 'create-react-class'
import { HotKeys } from 'react-hotkeys'
import PropTypes from 'prop-types'

let commands = []
commands.push({
  type: 'CREATE_CLASS',
  payload: {
    name: 'Greeting',
    props: {
      name: { type: 'string', default: '' }
    },
    render: [
      ['div', null, [
        'Hello ',
        { type: 'prop', value: 'name' }
      ]]
    ]
  }
})

// Contains React components
let registry = {
}

const Greeting = createReactClass({
  render () {
    return (
      React.createElement('div', null, `Hello ${this.props.name}`)
    )
  }
})

const map = {
  'string': 'ctrl+s',
  'class': 'ctrl+c',
}

const handlers = {
  'string': () => console.log('string'),
  'class': () => console.log('class'),
}

class App extends Component {
  render () {
    return (
      <HotKeys keyMap={map}>
        <HotKeys handlers={handlers}>
          <div className="main-container">
            <div className="App">
              <Greeting name="Brennan" />
            </div>
          </div>
        </HotKeys>
      </HotKeys>
    )
  }
}

export default App
