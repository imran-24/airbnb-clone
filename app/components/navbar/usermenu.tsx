'use client'

import {AiOutlineMenu} from 'react-icons/ai'
import Avater from '../avater';
import { useCallback, useState } from 'react';
import MenuItem from './menu-item';
import useLoginModal from '@/app/hooks/useLoginModal';
import useRegisterModal from '@/app/hooks/useRegisterModal';
import useRentModal from '@/app/hooks/useRentModal';
import { signOut } from 'next-auth/react';
import { SafeUser } from '@/app/types';
import { useRouter } from 'next/navigation';


interface UserMenuInterface{
    currentUser?: SafeUser | null
}

const UserMenu: React.FC<UserMenuInterface> = ({currentUser}) => {
    const [isOpen, setIsOpen] = useState(false);
  const loginModal = useLoginModal()
  const router = useRouter();
  const registerModal = useRegisterModal()
  const rentModal = useRentModal()
  const toggleAction = useCallback(()=>{
    setIsOpen((value) => !value)
  },[])

  return (
    <div>
        <div className='flex items-center gap-3'>
            {currentUser && 
            <div 
                onClick={()=> rentModal.onOpen()}
                className='
                    font-bold 
                    text-sm 
                    hidden 
                    lg:flex 
                    hover:bg-neutral-100 
                    cursor-pointer 
                    transition 
                    rounded-full 
                    px-4 py-3'>
                Airbnb your home
            </div>}
            <div
                onClick={toggleAction}
                className='
                flex items-center gap-3
                border 
                rounded-full 
                p-4
                md:px-2
                md:py-1
                shadow-sm
                cursor-pointer 
                hover:shadow-md 
                transition 
                '>
                <AiOutlineMenu />
                <div className='hidden md:flex '>
                    <Avater />
                </div>
            </div> 
        </div>
        {isOpen && 
        <div className='absolute top-16 right-0 shadow-lg w-[200px] transition duration-150 ease-out rounded-xl  bg-white'>
            {currentUser == null ? 
                <>
                <MenuItem onclick={()=> loginModal.onOpen()}  title='Log in'/>
                <MenuItem onclick={()=> registerModal.onOpen()} title='Sign up'/>
                </>
                : 
                <>
                <MenuItem onclick={()=> router.push('/trips')}  title='My trips'/>
                <MenuItem onclick={()=> {}} title='My favourites'/>
                <MenuItem onclick={()=> router.push('/properties')}  title='My properties'/>
                <MenuItem onclick={()=> router.push('/reservations')} title='My reservations'/>
                <MenuItem onclick={()=> rentModal.onOpen()}  title='Airbnb my home'/>
                <hr />
                <MenuItem onclick={()=> signOut()} title='Sign out'/>
                </>

            }
        </div>}
    </div>
  )
}

export default UserMenu