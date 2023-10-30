import React, { useState, useEffect } from 'react'
import axios from 'axios'

import Table from './components/Table'


const Starships = () => {
    const [isLoading, setIsLoading] = useState(true)

    const [data, setData] = useState({})
    const [url, setURL] = useState("https://swapi.dev/api/starships/")
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
        <Table
            results={data}
            title={"Planets"}
            subNameKey={"model"}
            createdKey={"created"}
        ></Table>
    )
}

export default Starships
