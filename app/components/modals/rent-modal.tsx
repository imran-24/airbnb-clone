'use client'

import useRentModal from '@/app/hooks/useRentModal';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, {useCallback, useMemo, useState} from 'react'
import { useForm, FieldValues, SubmitHandler } from 'react-hook-form';
import Heading from '../Heading';
import Counter from '../inputs/Counter';
import Input from '../inputs/Input';
import Modal from './modal';
import CategoryInput from '../inputs/category-input';
import { categories } from '@/app/utils';
import CountrySelect from '../inputs/country-select';
import ImageUpload from '../image-upload';
import SelectMap from '../map';
import { toast } from 'react-hot-toast';

 enum STEPS{
    CATEGORY = 0,
    LOCATION = 1,
    INFO = 2,
    IMAGES = 3,
    DESCRIPTION = 4,
    PRICE = 5
  }

const RentModal = () => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter()
  const rentModal = useRentModal()
  const [step, setStep] = useState(STEPS.CATEGORY)


  const {
    register, 
    handleSubmit,
    setValue,
    watch,
    reset,
    formState:{
        errors
    }
  } = useForm<FieldValues>({
    defaultValues:{
        category: '',
        location: null,
        guestCount: 1,
        roomCount: 1,
        bathroomCount: 1,
        imageSrc: '',
        description: '',
        price: 1,
        title: '',
    }
  })

  const category = watch('category')
  const location = watch('location')
  const guestCount = watch('guestCount')
  const roomCount = watch('roomCount')
  const bathroomCount = watch('bathroomCount')
  const imageSrc = watch('imageSrc')


  const setCustomValue = (id: string, value: any)=>{
    
    setValue(id, value, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true
    })
  }
  const onBack = ()=>{
    if(step > 0){
      setStep(value => value - 1)
    }
  }

  const onNext = ()=>{
    
    setStep(value => value + 1)
    
  }

  const actionLabel = useMemo(()=>{
    if(step == STEPS.PRICE) return 'Create'
    return 'Next'
  },[step])

  const secondaryLabel = useMemo(()=>{
    if(step == STEPS.CATEGORY) return undefined
    return 'Back'
  },[step])

  const onSubmit: SubmitHandler<FieldValues> = (data)=>{
  
    
    if(step != STEPS.PRICE) return onNext()

    // console.log(data)
    setIsLoading(true)
    axios.post('/api/listings', data)
    .then(()=>{
      setIsLoading(false)
      toast.success("Created!")
      router.refresh() 
      reset()
      setStep(STEPS.CATEGORY)
      rentModal.onClose()
    })
    .catch(()=>{
      toast.error('Something went wrong')
    })
    .finally(()=>{
      setIsLoading(false)
    })

    // console.log(data)
    

  }



  let body = (
    <div className='flex flex-col gap-3'>
      <Heading 
      title='Whice of these best describe your place?'
      subtitle='Pick a category'
      />
      <div className='flex flex-wrap gap-3 py-3'>
        {
          categories.map(item => (
            <CategoryInput 
            key={item.label}
            onClick={(value)=> setCustomValue('category', value)}
            selected={category == item.label}
            label={item.label}
            icon={item.icon}/>
          ))
        }
        
      </div>
      
    </div>
  )

  if(step ==  STEPS.LOCATION){
    body = (
      <div className='flex flex-col gap-3'>
        <Heading 
        title='Where is your place located?'
        subtitle='Help guest find you!'
        />
        <CountrySelect 
        value={location}
        onChange={(value)=> setCustomValue('location', value)}/>
        {
          location?.latlng && 
          <div className='text-black'>
            <SelectMap 
            value={location.latlng}
            />
          </div>
        }
      </div>
    )
  }

  if(step ==  STEPS.INFO){
    body = (
      <div className='flex flex-col gap-3'>
        <Heading 
        title='Share some basics about your place?'
        subtitle='What amenities do you have?'
        />
        <div className='flex flex-col gap-6 py-3'>
        <Counter 
        title='Guests'
        subtitle="How meny guests do you allow?"
        value={guestCount}
        onChange={(value: number) => setCustomValue('guestCount', value)}
        />
        <Counter 
        title='Rooms'
        subtitle="How meny rooms do you have?"
        value={roomCount}
        onChange={(value: number) => setCustomValue('roomCount', value)}
        />
        <Counter 
        title='Bathrooms'
        subtitle="How meny bathrooms do you have?"
        value={bathroomCount}
        onChange={(value: number) => setCustomValue('bathroomCount', value)}
        />
        </div>
        
      </div>
    )
  }

  if(step ==  STEPS.IMAGES){
    body = (
      <div className='flex flex-col gap-3'>
        <Heading 
        title='Add a photo of your place?'
        subtitle='Show guest what your place looks like!'
        />
        <ImageUpload 
        disabled={isLoading}
        label='Upload a photo of your place'
        value={imageSrc}
        onChange={(value: string)=> setCustomValue('imageSrc', value)}
        /> 
        
      </div>
    )
  }

  if(step ==  STEPS.DESCRIPTION){
    body = (
      <div className='flex flex-col gap-3'>
        <Heading 
        title='How could you describe your place?'
        subtitle='Short and sweet works best!'
        />
        <Input
        label={'title'}
        required
        disabled={isLoading}
        type='text'
        errors={errors}
        id='title'
        register={register} />
        <Input
        label={'Description'}
        required
        disabled={isLoading}
        type='text'
        errors={errors}
        id='description'
        register={register} />

      </div>
    )
  }

  

  // if(step ==  STEPS.INFO){
  //   body = (
  //     <div className='flex flex-col gap-3'>
  //       <Heading 
  //       title='Share some basics about your place?'
  //       subtitle='What amenities do you have?'
  //       />
  //       <div className='flex flex-col gap-6 py-3'>
  //       <Counter 
  //       title='Guests'
  //       subtitle="How meny guests do you allow?"
  //       value={guestCount}
  //       onChange={(value: number) => setCustomValue('guestCount', value)}
  //       />
  //       <Counter 
  //       title='Rooms'
  //       subtitle="How meny rooms do you have?"
  //       value={roomCount}
  //       onChange={(value: number) => setCustomValue('roomCount', value)}
  //       />
  //       <Counter 
  //       title='Bathrooms'
  //       subtitle="How meny bathrooms do you have?"
  //       value={bathroomCount}
  //       onChange={(value: number) => setCustomValue('bathroomCount', value)}
  //       />
  //       </div>
        
  //     </div>
  //   )
  // }

  // if(step ==  STEPS.IMAGES){
  //   body = (
  //     <div className='flex flex-col gap-3'>
  //       <Heading 
  //       title='Add a photo of your place?'
  //       subtitle='Show guest what your place looks like!'
  //       />
  //       <ImageUpload 
  //       value={imageSrc}
  //       onChange={(value: string)=> setCustomValue('imageSrc', value)}
  //       /> 
        
  //     </div>
  //   )
  // }

  if(step ==  STEPS.PRICE){
    body = (
      <div className='flex flex-col gap-3'>
        <Heading 
        title='Now, set your price'
        subtitle='How much do you charge per night!'
        />
        <Input
        label={'Price'}
        required
        disabled={isLoading}
        type='number'
        formatPrice
        errors={errors}
        id='price'
        register={register} />
      </div>
    )
  }

  const footer = (
    <div className='w-full flex flex-col gap-3 '>
      
    </div>
  )

  return (
    <Modal
    body={body}
    footer={footer}
    disabled={isLoading}
    title='Airbnb yoru home!'
    actionLabel={actionLabel}
    secondaryLabel={secondaryLabel}
    secondaryAction={STEPS.CATEGORY ? undefined : onBack}
    isOpen={rentModal.isOpen}
    onClose={rentModal.onClose}
    onSubmit={handleSubmit(onSubmit)} />
  )
}

export default RentModal