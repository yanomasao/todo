import { useState } from 'react'
// const logo = require('./logo.svg').default;
import './App.css'
import Foo from './Foo'
import React from 'react'
import TodoTable from './TodoTable'
import TodoForm from './TodoForm'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      <header className="App-header">
      <TodoForm/>
      <TodoTable/>
      </header>
    </div>
  )
}

export default App
