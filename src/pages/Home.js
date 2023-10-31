import React from 'react'
import { useNavigate } from "react-router-dom"

import { ReactComponent as PlanetsSVG } from '../images/planets.svg'
import { ReactComponent as PersonSVG } from '../images/astronaut.svg'
import { ReactComponent as StarshipSVG } from '../images/starship.svg'


const Home = () => {
    const navigator = useNavigate()
    const options = [
        { title: "Personas", link: "/persons"},
        { title: "Planetas", link: "/planets" },
        { title: "Naves", link: "/starships" }
    ]

    return (
        <aside className='h-screen w-screen flex items-center justify-center'>
            <div className='flex md:flex-col lg:flex-row gap-7'>
                {options.map((option, idx) => (
                    <div
                        key={option.title}
                        onClick={() => navigator(option.link)}
                        className='rounded-lg border flex flex-col p-6 cursor-pointer'
                    >
                        { option.title === "Personas" && <PersonSVG className='w-48 h-56' /> }
                        { option.title === "Naves" && <StarshipSVG className='w-48 h-56' /> }
                        { option.title === "Planetas" && <PlanetsSVG className='w-48 h-56' /> }
                        <span className='text-xl text-center'>{ option.title }</span>
                    </div>
                ))}
            </div>
        </aside>
    )
}

export default Home
