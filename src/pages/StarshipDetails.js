import React, { useState, useEffect } from 'react'
import { useLocation, redirect, NavLink } from "react-router-dom"

import axios from "axios"
import Loading from "./components/Loading"
import { extractID } from '../utils/string'


const StarshipDetails = () => {
    const [pilots, setPilots] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const { state } = useLocation()
    if (!state) {
        redirect("/starships")
    }

    const starship = state.chargeData

    // Load starships data
    useEffect(() => {
        if (!starship.pilots || !starship.pilots.length) {
            setIsLoading(false)
        } else {
            const promises = starship.pilots.map((pilotsURL) => axios.get(pilotsURL))
            Promise.all(promises)
                .then((results) => {
                    const mappedDate = results.map((e) => e.data)
                    setPilots(mappedDate)
                })
                .catch((err) => console.error(err))
                .finally(() => setIsLoading(false))
        }
    }, [])

    if (isLoading) return <Loading></Loading>
    
    const src = `https://ui-avatars.com/api/?name=${starship.name.replace(" ", "+")}&rounded=true`
    return (
        <aside className='p-12 px-44'>
            <NavLink className="pb-3" to="/starships">Back to Starships</NavLink>
            <div className='flex gap-5 items-center border-b-2 py-3'>
                <img src={src} alt="charactersName" />
                <h1 className='text-2xl'>{starship.name} Details</h1>
            </div>
            <div className='flex flex-col gap-2 mt-3'>
                <span>Model: {starship.model}</span>
                <span>MGLT: {starship.MGLT}</span>
                <span>Cargo Capacity: {starship.cargo_capacity}</span>
                <span>Cost in credits: {starship.cost_in_credits}</span>
                <span>Crew: {starship.crew}</span>
                <span>Consumables: {starship.consumables}</span>
                <span>Max Atmosphering Speed: {starship.max_atmosphering_speed}</span>
            </div>
            <div className='flex flex-col gap-2 mt-3'>
                <span>Pilots:</span>
                <ul className='list-disc pl-7'>
                    {pilots.map((e) => (
                        <li key={e.name} className='cursor-pointer'>
                            <NavLink to={{ pathname: `/persons/${extractID(e.url)}`}} state={{ chargeData: e }}>{e.name}</NavLink>
                        </li>
                    ))}
                </ul>
            </div>
        </aside>
    )
}

export default StarshipDetails
