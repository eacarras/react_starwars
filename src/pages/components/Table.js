import React from 'react'
import { Link } from "react-router-dom";

const DATE_OPTIONS = { year: 'numeric', month: 'long', day: 'numeric' };

const Table = ({ title, results, subNameKey, createdKey, pathSeeMore, havePrevious, haveNext, next, previous }) => {

    return (
        <aside className='force-min-height w-screen p-6 pt-0 px-44'>
            <h1 className='text-2xl mt-7'>{ title }:</h1>
            <div className='mt-14 grid gap-3 overflow-auto h-3/4'>
                {results.map((data, idx) => {
                    const src = `https://ui-avatars.com/api/?name=${data.name.replace(" ", "+")}&rounded=true`

                    const str = data[subNameKey]
                    const subtitle = str.charAt(0).toUpperCase() + str.slice(1)

                    const createdAt = new Date(data[createdKey])

                    return (
                        <div key={idx} className='flex rounded-lg border p-1.5 items-center'>
                            <img className='flex-none h-9 w-9' alt="character" src={src} />
                            <div className='flex-none pl-4 w-80'>
                                <p className='text-lg'>{data.name}</p>
                                <p className='text-base'>{subtitle}</p>
                            </div>
                            <div className='flex-1 w-60'>
                                <p className='text-lg'>{createdAt.toLocaleDateString("en-US", DATE_OPTIONS)}</p>
                                <p className='text-base'>Fecha de Creación</p>
                            </div>
                            <Link className='flex-none pr-4' to={pathSeeMore}>Ver Más</Link>
                        </div>
                    )
                })}
            </div>
            <aside className='flex h-20 pt-6'>
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
