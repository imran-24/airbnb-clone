'use client'

import useLoginModal from '@/app/hooks/useLoginModal';
import useRegisterModal from '@/app/hooks/useRegisterModal';
import axios from 'axios';
import React, {useCallback, useState} from 'react'
import { useForm, FieldValues, SubmitHandler } from 'react-hook-form';
import Heading from '../Heading';
import Input from '../inputs/Input';
import { toast } from "react-hot-toast";
import Modal from './modal';
const RegisterModal = () => {

    const registerModal = useRegisterModal();
    const loginModal = useLoginModal()

    const [isLoading, setIsLoading] = useState(false);
    const {
        register, 
        handleSubmit,
        formState:{
            errors
        }
    } = useForm<FieldValues>({
        defaultValues:{
            name: '',
            email: '',
            password: ''
        }
    })

    const handleLogin = useCallback(()=>{
        if(registerModal.isOpen){
          registerModal.onClose()
          loginModal.onOpen()
        }
      },[registerModal, loginModal])
    
      const onSubmit: SubmitHandler<FieldValues> = (data)=>{
      
        // console.log(data)
        setIsLoading(true)
    
        axios.post('api/register', data)
        .then(() => {
          registerModal.onClose()
          toast.success("Registered")
          loginModal.onOpen()
        })
        .catch((error) => {
          toast.error("Something went wrong")
        })
        .finally(()=> setIsLoading(false))
    
    }

    const body = (
        <div className='flex flex-col gap-3'>
          <Heading 
          title='Welcome to Airbnb'
          subtitle='Create an account!'
          />
          <div className='flex flex-col gap-3 py-3'>
            <Input 
            type='text'
            id='name'
            register={register}
            disabled={isLoading}
            errors={errors}
            required
            label='Name'
            />
            <Input 
            type='email'
            id='email'
            register={register}
            disabled={isLoading}
            errors={errors}
            required
            label='Email'
            />
            <Input 
            type='password'
            id='password'
            register={register}
            disabled={isLoading}
            errors={errors}
            required
            label='Password'
            />
          </div>
          
        </div>
      )
      const footer = (
        <div className='w-full flex flex-col gap-3 '>
          <div className='flex items-center justify-center py-4'>
            <p className='text-sm text-neutral-500'>Already have an account?
              <span 
              onClick={handleLogin}
              className='font-bold pl-1 hover:underline transition cursor-pointer'>Log in</span>
            </p>
          </div>
        </div>
      )

  return (
    <Modal
    body={body}
    footer={footer}
    disabled={isLoading}
    title='Register'
    actionLabel='Continue'
    isOpen={registerModal.isOpen}
    onClose={registerModal.onClose}
    onSubmit={handleSubmit(onSubmit)} />
  )
}

export default RegisterModal