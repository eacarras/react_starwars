import React, { useState, useEffect } from 'react'
import { useLocation, redirect, NavLink } from "react-router-dom"

import axios from "axios"
import Loading from "./components/Loading"
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
            Promise.all(promises)
                .then((results) => {
                    const mappedDate = results.map((e) => e.data)
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
            <div className='flex gap-5 items-center border-b-2 pb-3'>
                <img src={src} alt="charactersName" />
                <h1 className='text-2xl'>{person.name} Details</h1>
            </div>
            <div className='flex flex-col gap-2 mt-3'>
                <span>Gender: {person.gender}</span>
                <span>Height: {person.height}</span>
                <span>Weight: {person.mass}</span>
                <span>Birth Year: {person.birth_year}</span>
                <span>Hair Color: {person.hair_color}</span>
                <span>Skin Color: {person.skin_color}</span>
                <span>Eye Color: {person.eye_color}</span>
            </div>
            <div className='flex flex-col gap-2 mt-3'>
                <span>Staships:</span>
                <ul className='list-disc pl-7'>
                    {starships.map((e) => (
                        <li key={e.name} className='cursor-pointer'>
                            <NavLink to={{ pathname: `/startships/${extractID(e.url)}`}} state={{ chargeData: e }}>{e.name}</NavLink>
                        </li>
                    ))}
                </ul>
            </div>
        </aside>
    )
}

export default PersonDetails
