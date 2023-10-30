import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from "react-router-dom"

// Import pages
import Home from './pages/Home'
import Persons from './pages/Persons'
import Planets from './pages/Planets'
import NotFound from './pages/NotFound'
import Starships from './pages/Starships'

import './index.css';
import reportWebVitals from './reportWebVitals'


// Main logic
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route index element={<Home />} />
          <Route path="persons" element={<Persons />} />
          <Route path="planets" element={<Planets />} />
          <Route path="starships" element={<Starships />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);

// Report vitals in console log for the moment
// TODO: IMPROVE THIS SENDING A URL
reportWebVitals(console.log)
