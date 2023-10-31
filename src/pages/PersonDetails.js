import React, { useState, useEffect } from 'react'
import { useLocation, redirect, NavLink } from "react-router-dom"

import axios from "axios"
import Loading from "./components/Loading"
import CellCard from './components/CellCard'

import { extractID } from '../utils/string'


const PersonDetails = () => {
    const [isLoading, setIsLoading] = useState(true)
    const [starships, setStarships] = useState([])
    const { state } = useLocation()
    if (!state || !state.chargeData) {
        redirect("/persons")
    }

    const person = state.chargeData

    // Load starships data
    useEffect(() => {
        if (!person.starships || !person.starships.length) {
            setIsLoading(false)
        } else {
            const promises = person.starships.map((starshipURL) => axios.get(starshipURL))
            Promise.allSettled(promises)
                .then((results) => {
                    const mappedDate = results.reduce((acc, e) => {
                        if (e.status === "fulfilled") {
                            acc.push(e.value.data)
                        }

                        return acc
                    }, [])
                    setStarships(mappedDate)
                })
                .catch((err) => console.error(err))
                .finally(() => setIsLoading(false))
        }
    }, [])

    if (isLoading) return <Loading></Loading>
    
    const src = `https://ui-avatars.com/api/?name=${person.name.replace(" ", "+")}&rounded=true`
    return (
        <aside className='p-12 px-44'>
            <NavLink className="pb-3 text-small font-bold" to="/persons">Back to Persons</NavLink>
            <aside className='rounded-lg border flex flex-row mt-12 force-height-card'>
                <div className='flex flex-col gap-5 justify-center items-center border-r-2 w-60'>
                    <img src={src} alt="charactersName" />
                    <h1 className='text-2xl'>{person.name}</h1>
                </div>
                <div className='flex flex-col gap-2 m-12'>
                    <span className='text-xl font-bold'>Details of Person</span>
                    <div className='grid grid-cols-2 forcer-cel-width gap-x-12 gap-y-5'>
                        <CellCard title={"Gender"} subtitle={person.gender} />
                        <CellCard title={"Height"} subtitle={person.height} />
                        <CellCard title={"Weight"} subtitle={person.mass} />
                        <CellCard title={"Birth Year"} subtitle={person.birth_year} />
                        <CellCard title={"Hair Color"} subtitle={person.hair_color} />
                        <CellCard title={"Skin Color"} subtitle={person.skin_color} />
                        <CellCard title={"Eye Color"} subtitle={person.eye_color} />
                    </div>
                    <div className='flex flex-col gap-2 mt-7'>
                        <span className='text-xl font-bold'>Starships:</span>
                        <ul className='list-disc list-values pl-7'>
                            {starships.map((e) => (
                                <li key={e.name} className='cursor-pointer decoration-solid'>
                                    <NavLink className="decoration-solid" to={{ pathname: `/startships/${extractID(e.url)}`}} state={{ chargeData: e }}>{e.name}</NavLink>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </aside>
        </aside>
    )
}

export default PersonDetails
