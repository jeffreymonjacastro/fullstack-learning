import { useState } from 'react'
import { Navbar } from './components/Navbar'
import { Welcome } from './components/Welcome'
import { Todo } from './components/Todo'
import { Numbers } from './components/Numbers'
import { Calendar } from './components/Calendar'
import { User } from './components/User'
import { 
	BrowserRouter as Router, 
	Routes, 
	Route } from 'react-router-dom'
import './css/App.css'

function App() {
  
  return (
    <>
      <Navbar />
      <Welcome />
      <Todo />
      <Numbers />
      <Calendar />
      <User />
    </>
  )
}

export default App
