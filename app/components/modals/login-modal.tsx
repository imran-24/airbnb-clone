'use client'

import useLoginModal from '@/app/hooks/useLoginModal';
import useRegisterModal from '@/app/hooks/useRegisterModal';
import { useRouter } from 'next/navigation';
import {useState, useCallback} from 'react'
import { useForm, FieldValues, SubmitHandler } from 'react-hook-form';
import Input from '../inputs/Input';
import Heading from '../Heading';
import Button from '../Button';
import Modal from './modal';
import {signIn} from 'next-auth/react'
import { toast } from 'react-hot-toast';


const LoginModal = () => {
  const loginModal = useLoginModal();
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter()
  const registerModal = useRegisterModal()
  
  
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

  const onSubmit: SubmitHandler<FieldValues> = (data)=>{
  
    setIsLoading(true)

    signIn('credentials',{
      ...data,
      redirect: false
    })
    .then((callback)=>{
      setIsLoading(false)
      
      if(callback?.ok) 
      { toast.success("Logged in")
        router.refresh()
        loginModal.onClose()
      }
      else{
        if(callback?.error) toast.error(callback.error)
      }
    })

  }

  const handleSignUp = useCallback(()=>{
    if(loginModal.isOpen){
      loginModal.onClose()
      registerModal.onOpen()
    }
  },[registerModal, loginModal])

  const body = (
    <div className='flex flex-col gap-3'>
      <Heading 
      title='Welcome back'
      subtitle='Login to your account!'
      />
      <div className='flex flex-col gap-3 py-3'>
        
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
        <p className='text-sm text-neutral-500'>First time using Airbnb?
          <span 
          onClick={handleSignUp}
          className='font-bold pl-1 hover:underline transition cursor-pointer'>Sign up</span>
        </p>
      </div>
    </div>
  )

  return (
    <Modal
    body={body}
    footer={footer}
    disabled={isLoading}
    title='Login'
    actionLabel='Continue'
    isOpen={loginModal.isOpen}
    onClose={loginModal.onClose}
    onSubmit={handleSubmit(onSubmit)} />
  )
}

export default LoginModal