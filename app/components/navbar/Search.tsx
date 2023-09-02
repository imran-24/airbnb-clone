import React from 'react'
import {AiOutlineSearch} from 'react-icons/ai'

const Search = () => {
  return (
    <div className='w-full md:w-auto shadow hover:shadow-md transition cursor-pointer rounded-full'>
        <div className='flex items-center justify-between py-2'>
            <div className='border-r'>
                <p className='px-4 text-sm font-bold'>Anywhere</p>
            </div>
            <div className='border-r hidden sm:block'>
                <p className='px-4 text-sm font-bold'>Any Week</p>
            </div>
            <div className='flex items-center gap-3 pr-2 '>
                <div className='hidden sm:flex pl-6 text-sm'>
                    Add Guest
                </div>
                <div className='rounded-full bg-rose-500 p-2 hover:bg-rose-600 transition cursor-pointer'>
                    <AiOutlineSearch size={20} className='fill-white' />
                </div>
                
            </div>
        </div>
    </div>
  )
}

export default Search