import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Planets = () => {
    const [isLoading, setIsLoading] = useState(true)

    const [data, setData] = useState({})
    const [url, setURL] = useState("https://swapi.dev/api/planets/")
    const [previousPage, setPreviousPage] = useState(null)

    // Loading data
    useEffect(() => {
        axios.get(url)
            .then((e) => {
                const { next, previous, results=[] } = e.data
                if (next) {
                    setURL(next)
                }
                if (previous) {
                    setPreviousPage(previous)
                }

                setData(results)
            })
            .catch((err) => console.error(err))
            .finally(() => setIsLoading(false))
    }, [])

    if (isLoading) return <div>Loading..</div>
    return (
        <aside className='h-screen w-screen'>
            <h1>Planets:</h1>
            <div>
                {data.map((planet, idx) => (
                    <p key={idx}>{planet.name}</p>
                ))}
            </div>
        </aside>
    )
}

export default Planets
