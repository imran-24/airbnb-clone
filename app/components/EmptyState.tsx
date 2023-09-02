'use client'
import React from 'react'
import Heading from './Heading'
import Button from './Button'
import { useRouter } from 'next/navigation'

interface EmptyStateInterface{
    title?: string,
    subtitle?: string,
    showReset?: boolean
}

const EmptyState: React.FC<EmptyStateInterface> = ({
    title='No exact Matches',
    subtitle='Try changing or removing some of your filters',
    showReset
}) => {
  const router = useRouter()
  return (
    <div
    className='
    h-[80vh]
    w-full
    flex 
    flex-col
    items-center
    justify-center
    '
    >
        <Heading
        center
        title={title}
        subtitle={subtitle}
        />
        <div className='pt-2'>
        {
            showReset && 
            <Button
            outline
            small
            label='Remove all'
            onClick={()=> router.push('/')}
            />
        }
        </div>
    </div>
  )
}

export default EmptyState