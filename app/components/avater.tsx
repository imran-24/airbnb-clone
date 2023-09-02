import Image from 'next/image'
import React from 'react'

const Avater = () => {
  return (
    <Image
        height={30}
        width={30}
        alt='dp'
        src={'/user-placeholder.png'}
        className='object-contain rounded-full'
    />
  )
}

export default Avater