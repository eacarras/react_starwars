import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from "react-router-dom"

// Import pages
import Home from './pages/Home'
import NotFound from './pages/NotFound'

import Persons from './pages/persons/Persons'
import PersonDetails from './pages/persons/PersonDetails'

import Planets from './pages/planets/Planets'
import PlanetDetails from './pages/planets/PlanetDetails'

import Starships from './pages/starships/Starships'
import StarshipDetails from './pages/starships/StarshipDetails'

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
          <Route exact path='persons/:id' element={<PersonDetails />}/>
          <Route path="planets" element={<Planets />} />
          <Route exact path='planets/:id' element={<PlanetDetails />}/>
          <Route path="starships" element={<Starships />} />
          <Route exact path='startships/:id' element={<StarshipDetails />}/>
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
