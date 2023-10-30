import React from 'react'
import { Link } from "react-router-dom";


import './home.css'

const Home = () => {
    const options = [
        { title: "Personas", link: "/persons" },
        { title: "Planetas", link: "/planets" },
        { title: "Naves", link: "/starships" }
    ]

    return (
        <aside className='h-screen w-screen flex items-center justify-center'>
            <div className='card-container grid-cols-3 gap-2.5'>
                {
                    options.map((option, idx) => (
                        <div
                            key={idx}
                            className='rounded-lg border p-1.5 cursor-pointer'
                        >
                            <Link to={option.link}>{ option.title }</Link>
                        </div>
                    ))
                }
            </div>
        </aside>
    )
}

export default Home
