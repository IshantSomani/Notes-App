import React from 'react'

const EmptyCard = ({ imgSrc, message }) => {
    return (
        <div className='flex flex-col items-center justify-center w-full'>
            <img src={imgSrc} alt="No Notes" className='sm:w-1/3 rounded' />
            <p className='w-1/2 text-sm font-medium text-slate-700 text-center leading-7 mt-3'>
                {message}
            </p>
        </div>
    )
}

export default EmptyCard