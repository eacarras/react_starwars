import React, { useState } from 'react'
import { Link } from "react-router-dom"

import { extractID } from '../../utils/string'

const DATE_OPTIONS = { year: 'numeric', month: 'long', day: 'numeric' };

const Table = ({ title, results, subNameKey, createdKey, pathSeeMore, havePrevious, haveNext, next, previous }) => {
    const [inputValue, setInputValue] = useState("")
    const [filteredResults, setFilteredResults] = useState(results)

    const pageSearch = () => {
        if (inputValue && inputValue.length >= 1) {
            const filters = results.filter((e) => e.name.toLowerCase().includes(inputValue.toLocaleLowerCase()))
            setFilteredResults(filters)
        } else {
            setFilteredResults(results)
        }
    }

    return (
        <aside className='force-min-height w-screen p-6 pt-0 lg:px-44'>
            <h1 className='text-2xl mt-7'>{ title }:</h1>
            <div className='flex flex-row mt-14 gap-2'>
                <input
                    className='w-44 h-10 border rounded-md p-2'
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            pageSearch()
                        }
                    }} />
                { inputValue && inputValue.length && (
                    <button 
                        className='h-10 w-28 bg-cyan-600 rounded-md border'
                        onClick={() => {
                            setInputValue("")
                            setFilteredResults(results)
                        }}
                    >RESET</button>
                )}
            </div>
            
            <div className='grid gap-3 mt-2 overflow-auto h-3/4'>
                {filteredResults.map((data, idx) => {
                    const src = `https://ui-avatars.com/api/?name=${data.name.replace(" ", "+")}&rounded=true`

                    const str = data[subNameKey]
                    const subtitle = str.charAt(0).toUpperCase() + str.slice(1)

                    const createdAt = new Date(data[createdKey])

                    return (
                        <div key={idx} className='flex rounded-lg border p-1.5 items-center'>
                            <img className='flex-none h-9 w-9' alt="character" src={src} />
                            <div className='flex-none pl-4 w-52 md:w-80'>
                                <p className='text-lg'>{data.name}</p>
                                <p className='text-base'>{subtitle}</p>
                            </div>
                            <div className='w-60 hidden md:block lg:flex-1'>
                                <p className='text-lg'>{createdAt.toLocaleDateString("en-US", DATE_OPTIONS)}</p>
                                <p className='text-base'>Fecha de Creación</p>
                            </div>
                            <Link
                                className='flex-none pr-4'
                                to={`${pathSeeMore}/${extractID(data.url)}`}
                                state={{ chargeData: data }}
                            >
                                Ver Más
                            </Link>
                        </div>
                    )
                })}
            </div>
            <aside className='flex h-16 pt-6'>
                <span
                    className={`flex-none font-bold ${havePrevious ? 'cursor-pointer' : 'cursor-not-allowed'}`}
                    onClick={() => {
                        if (havePrevious) {
                            previous()
                        }
                    }}
                >
                        Anterior
                </span>
                <span className='flex-1'></span>
                <span
                    className={`flex-none font-bold ${haveNext ? 'cursor-pointer' : 'cursor-not-allowed'}`}
                    onClick={() => {
                        if (haveNext) {
                            next()
                        }
                    }}
                >
                    Siguiente
                </span>
            </aside>
        </aside>
    )
}

export default Table
