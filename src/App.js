import React, { Component } from 'react'
import './App.css'
import createReactClass from 'create-react-class'
import { HotKeys } from 'react-hotkeys'

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
        <div className="App">
          <HotKeys handlers={handlers}>
            <Greeting name="Brennan" />
          </HotKeys>
        </div>
      </HotKeys>
    )
  }
}

export default App
