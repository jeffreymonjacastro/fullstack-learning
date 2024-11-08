import { useState } from 'react'
import {
  Route,
  Routes,
  BrowserRouter as Router
} from 'react-router-dom'
import './App.css'
import ListTransformation from './modules/1/ListTransformation'

function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<div>Home</div>} />
          <Route path="/list-transformation" element={<ListTransformation />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
