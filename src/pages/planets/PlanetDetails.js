import React, { useState, useEffect } from 'react'
import { useLocation, NavLink, redirect } from "react-router-dom"

import axios from "axios"
import Loading from "../components/Loading"
import CellCard from '../components/CellCard'

import { extractID } from '../../utils/string'


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
            Promise.allSettled(promises)
                .then((results) => {
                    const mappedDate = results.reduce((acc, e) => {
                        if (e.status === "fulfilled") {
                            acc.push(e.value.data)
                        }

                        return acc
                    }, [])
                    setResidents(mappedDate)
                })
                .catch((err) => console.error(err))
                .finally(() => setIsLoading(false))
        }
    }, [])

    if (isLoading) return <Loading></Loading>
    
    const src = `https://ui-avatars.com/api/?name=${planet.name.replace(" ", "+")}&rounded=true`
    return (
        <aside className='p-12 md:px:22 lg:px-44'>
            <NavLink className="pb-3 text-small font-bold" to="/persons">Back to Planets</NavLink>
            <aside className='rounded-lg border flex flex-col lg:flex-row lg:pt-0 pt-6 mt-12 lg:force-height-card items-center'>
                <div className='flex flex-col gap-5 justify-center items-center force-height lg:border-r-2 w-60'>
                    <img src={src} alt="charactersName" />
                    <h1 className='text-2xl'>{planet.name}</h1>
                </div>
                <div className='flex flex-col gap-2 m-12'>
                    <span className='text-xl font-bold'>Details of Planet</span>
                    <div className='grid grid-cols-2 forcer-cel-width gap-x-12 gap-y-5'>
                        <CellCard title={"Rotation Period"} subtitle={planet.rotation_period} />
                        <CellCard title={"Climate"} subtitle={planet.climate} />
                        <CellCard title={"Gravity"} subtitle={planet.gravity} />
                        <CellCard title={"Terrain"} subtitle={planet.terrain} />
                        <CellCard title={"Population"} subtitle={planet.population}  />
                        <CellCard title={"Diameter"} subtitle={planet.diameter} />
                        <CellCard title={"Surface Water"} subtitle={planet.surface_water} />
                    </div>
                    <div className='flex flex-col gap-2 mt-3'>
                        <span className='text-xl font-bold'>Residents:</span>
                        <ul className='list-disc list-values pl-7'>
                            {residents.map((e) => (
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

export default PlanetDetails
