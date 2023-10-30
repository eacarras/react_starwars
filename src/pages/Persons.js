import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Persons = () => {
    const [isLoading, setIsLoading] = useState(true)

    const [data, setData] = useState({})
    const [url, setURL] = useState("https://swapi.dev/api/people/")
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
            <h1>Persons:</h1>
            <div>
                {data.map((person, idx) => (
                    <p key={idx}>{person.name}</p>
                ))}
            </div>
        </aside>
    )
}

export default Persons
