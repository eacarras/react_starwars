import React, { useState, useEffect } from 'react'
import axios from 'axios'

import Table from '../components/Table'
import Loading from "../components/Loading"


const Planets = () => {
    const [isLoading, setIsLoading] = useState(true)

    const [data, setData] = useState({})
    const [url, setURL] = useState("https://swapi.dev/api/planets/")
    const [previousPage, setPreviousPage] = useState(null)

    // Functions
    const makeRequest = (endpoint) => {
        setIsLoading(true)
        axios.get(endpoint)
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
    }
    // Loading data
    useEffect(() => {
        makeRequest(url)
    }, [])

    if (isLoading) return <Loading></Loading>
    return (
        <Table
            results={data}
            title={"Planets"}
            subNameKey={"terrain"}
            createdKey={"created"}
            haveNext={url !== null}
            havePrevious={previousPage !== null}
            next={() => makeRequest(url)}
            previous={() => makeRequest(previousPage)}
            seeMore={(planets) => {}}
            pathSeeMore={"/planets"}
        ></Table>
    )
}

export default Planets
