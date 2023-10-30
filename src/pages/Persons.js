import React, { useState, useEffect } from 'react'
import axios from 'axios'

import Loading from "./components/Loading"
import Table from './components/Table'


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

    if (isLoading) return <Loading></Loading>
    return (
        <Table
            results={data}
            title={"Personas"}
            subNameKey={"gender"}
            createdKey={"created"}
        ></Table>
    )
}

export default Persons
