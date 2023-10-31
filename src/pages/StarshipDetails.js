import React, { useState, useEffect } from 'react'
import { useLocation, redirect, NavLink } from "react-router-dom"

import axios from "axios"
import Loading from "./components/Loading"
import CellCard from './components/CellCard'

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
            Promise.allSettled(promises)
                .then((results) => {
                    const mappedDate = results.reduce((acc, e) => {
                        if (e.status === "fulfilled") {
                            acc.push(e.value.data)
                        }

                        return acc
                    }, [])
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
            <NavLink className="pb-3 text-small font-bold" to="/persons">Back to Starships</NavLink>
            <aside className='rounded-lg border flex flex-row mt-12 force-height-card'>
                <div className='flex flex-col gap-5 justify-center items-center border-r-2 w-60'>
                    <img src={src} alt="charactersName" />
                    <h1 className='text-2xl'>{starship.name}</h1>
                </div>
                <div className='flex flex-col gap-2 m-12'>
                    <span className='text-xl font-bold'>Details of Starship</span>
                    <div className='grid grid-cols-2 forcer-cel-width gap-x-12 gap-y-5'>
                        <CellCard title={"Model"} subtitle={starship.model} />
                        <CellCard title={"MGLT"} subtitle={starship.MGLT} />
                        <CellCard title={"Cargo Capacity"} subtitle={starship.cargo_capacity} />
                        <CellCard title={"Cost in credits"} subtitle={starship.cost_in_credits} />
                        <CellCard title={"Crew"} subtitle={starship.crew} />
                        <CellCard title={"Consumables"} subtitle={starship.consumables} />
                        <CellCard title={"Max Atmosphering Speed"} subtitle={starship.max_atmosphering_speed} />
                    </div>
                    <div className='flex flex-col gap-2 mt-3'>
                        <span className='text-xl font-bold'>Pilots:</span>
                        <ul className='list-disc list-values pl-7'>
                            {pilots.map((e) => (
                                <li key={e.name} className='cursor-pointer'>
                                    <NavLink to={{ pathname: `/persons/${extractID(e.url)}`}} state={{ chargeData: e }}>{e.name}</NavLink>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </aside>
        </aside>
    )
}

export default StarshipDetails
