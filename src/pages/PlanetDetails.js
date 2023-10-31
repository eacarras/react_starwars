import React, { useState, useEffect } from 'react'
import { useLocation, NavLink, redirect } from "react-router-dom"

import axios from "axios"
import Loading from "./components/Loading"
import { extractID } from '../utils/string'


const PlanetDetails = () => {
    const [isLoading, setIsLoading] = useState(true)
    const [residents, setResidents] = useState([])
    const { state } = useLocation()
    if (!state || !state.chargeData) {
        redirect("/planets")
    }

    const planet = state.chargeData

    // Load starships data
    useEffect(() => {
        if (!planet.residents || !planet.residents.length) {
            setIsLoading(false)
        } else {
            const promises = planet.residents.map((residentURL) => axios.get(residentURL))
            Promise.all(promises)
                .then((results) => {
                    const mappedDate = results.map((e) => e.data)
                    setResidents(mappedDate)
                })
                .catch((err) => console.error(err))
                .finally(() => setIsLoading(false))
        }
    }, [])

    if (isLoading) return <Loading></Loading>
    
    const src = `https://ui-avatars.com/api/?name=${planet.name.replace(" ", "+")}&rounded=true`
    return (
        <aside className='p-12 px-44'>
            <div className='flex gap-5 items-center border-b-2 pb-3'>
                <img src={src} alt="charactersName" />
                <h1 className='text-2xl'>{planet.name} Details</h1>
            </div>
            <div className='flex flex-col gap-2 mt-3'>
                <span>Rotation Period: {planet.rotation_period}</span>
                <span>Climate: {planet.climate}</span>
                <span>Gravity: {planet.gravity}</span>
                <span>Terrain: {planet.terrain}</span>
                <span>Population: {planet.population}</span>
                <span>Diameter: {planet.diameter}</span>
                <span>Surface Water: {planet.surface_water}</span>
            </div>
            <div className='flex flex-col gap-2 mt-3'>
                <span>Residents:</span>
                <ul className='list-disc pl-7'>
                    {residents.map((e) => (
                        <li key={e.name} className='cursor-pointer'>
                            <NavLink to={{ pathname: `/persons/${extractID(e.url)}`}} state={{ chargeData: e }}>{e.name}</NavLink>
                        </li>
                    ))}
                </ul>
            </div>
        </aside>
    )
}

export default PlanetDetails
