import React from 'react'

const CellCard = ({ title, subtitle }) => {
    return (
        <div className='flex flex-col'>
            <span className='text-sm text-slate-400'>{title}</span>
            <span className='text-base'>{subtitle}</span>
        </div>
        
    )
}

export default CellCard
