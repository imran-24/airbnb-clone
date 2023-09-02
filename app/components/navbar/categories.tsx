
'use client'

import React from 'react'
import Container from '../container'
import { categories } from '@/app/utils/index'
import CategoryBox from './category-box'
import { usePathname, useSearchParams } from 'next/navigation'


const Categories = () => {
  // searching a params
  const params = useSearchParams();
  const categoryParam = params?.get('category')

  const pathname = usePathname();
  const mainPage = pathname == '/'

  if(!mainPage) return null

  return (
    <Container>
        <div className="flex justify-between items-center overflow-x-auto ">
        {categories.map(category => (
                <CategoryBox 
                    key={category.label}
                    icon={category.icon}
                    label={category.label}
                    selected={category.label == categoryParam}
                />
            ))}
        </div>
    </Container>
  )
}

export default Categories