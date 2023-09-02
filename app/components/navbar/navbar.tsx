import React from 'react'
import Logo from './logo'
import Container from '../container'
import Search from './search'
import UserMenu from './usermenu'
import Categories from './categories'
import { SafeUser } from '@/app/types'

interface NavbarInterface{
  currentUser?: SafeUser | null | undefined;
}

const Navbar: React.FC<NavbarInterface> = ({currentUser}) => {
  return (
    <div className="w-full fixed bg-white z-50 shadow-sm">
        <div className='border-b-[1px] py-3'>
            <Container>
                <div className='flex-1 flex items-center justify-between'>
                    <Logo />
                    <Search />
                    <UserMenu currentUser={currentUser}/>
                </div>
            </Container>
        </div>
        <Categories />
    </div>
  )
}

export default Navbar