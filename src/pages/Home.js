import React from 'react'
import { Link } from "react-router-dom"

import { ReactComponent as PlanetsSVG } from '../images/planets.svg'
import { ReactComponent as PersonSVG } from '../images/astronaut.svg'
import { ReactComponent as StarshipSVG } from '../images/starship.svg'


const Home = () => {
    const options = [
        { title: "Personas", link: "/persons"},
        { title: "Planetas", link: "/planets" },
        { title: "Naves", link: "/starships" }
    ]

    return (
        <aside className='h-screen w-screen flex items-center justify-center'>
            <div className='grid grid-cols-3 gap-7'>
                {options.map((option, idx) => (
                    <div
                        key={option.title}
                        className='rounded-lg border flex flex-col p-6 cursor-pointer'
                    >
                        { option.title === "Personas" && <PersonSVG className='w-48 h-56' /> }
                        { option.title === "Naves" && <StarshipSVG className='w-48 h-56' /> }
                        { option.title === "Planetas" && <PlanetsSVG className='w-48 h-56' /> }
                        <Link className='text-xl text-center' to={option.link}>{ option.title }</Link>
                    </div>
                ))}
            </div>
        </aside>
    )
}

export default Home
