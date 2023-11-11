import React, { useCallback, useEffect, useState } from 'react'
import {RxCross2} from 'react-icons/rx'
import Button from '../Button';


interface ModalInterface{
    title?: string;
    disabled?: boolean;
    isOpen?: boolean;
    onSubmit: () => void;
    onClose: () => void;
    actionLabel: string;
    secondaryAction?: ()=> void,
    secondaryLabel?: string,
    body?: React.ReactElement;
    footer?: React.ReactElement;
}
const Modal: React.FC<ModalInterface> = ({ title,secondaryAction, secondaryLabel,  actionLabel, body, footer, onClose, onSubmit, disabled,isOpen}) => {
    
    const [showModal, setShowModal] = useState(isOpen)
    useEffect(()=>{
        setShowModal(isOpen)
    },[isOpen])

    const handleClose = useCallback(()=>{
        if(disabled) return
        setShowModal(false)
        setTimeout(()=>{
            onClose()
        },300) 
    },[disabled, onClose])

    const handleSubmit = useCallback(()=>{
        if(disabled) return 
        try{
            onSubmit()
        }
        catch(error){

        }
        finally{

        }
    },[disabled, onSubmit])

    const handleSecondaryAction = useCallback(()=>{
        if(disabled || !secondaryAction) return 
        secondaryAction()
    },[secondaryAction, disabled])
    
    if(!isOpen) return null;
    return (
    <div className='
    bg-neutral-800
        bg-opacity-50
        inset-0
        fixed
        z-50
        overflow-x-hidden
        overflow-y-auto
        flex 
        items-center
        justify-center
        '>
        {/* container */}
        <div className='
            relative
            sm:h-auto
            h-full
            w-full
            sm:w-3/5
            md:w-4/6
            lg:w-3/6
            xl:w-2/5
            md:h-auto
            '>
                <div className={`
                    h-full
                    translate
                    duration-300
                    ${showModal ? 'translate-y-0' : 'translate-y-full'}
                    ${showModal ? 'bg-opacity-100' : 'opacity-0'}
                    `}>
                    <div className='
                        translate 
                        h-full 
                        border-0 
                        shadow-lg 
                        relative 
                        w-full 
                        rounded-lg 
                        bg-white 
                        px-4 
                        flex 
                        flex-col 
                        '>
                        {/* Header */}
                        <div 
                        className='
                        flex items-center justify-between py-4  border-b-[1px]
                        '>
                        <p className='text-lg font-semibold text-center flex-1'>{title}</p> 
                        <div 
                           onClick={handleClose}
                        className='cursor-pointer absolute left-6 rounded-full hover:bg-neutral-300/50 transition p-1'>
                            <RxCross2 size={22} />
                        </div>
                        </div>
                        {/* body */}
                        <div className='my-4 h-full'>
                            {body}
                        </div>
                        {/* footer */}
                        <div className=' flex flex-col gap-2 items-center my-4 '>
                        <div className='w-full flex items-center gap-2 '>
                            {(secondaryAction && secondaryLabel) &&
                            <Button 
                            outline
                            label={secondaryLabel as string}
                            disabled={disabled}
                            onClick={handleSecondaryAction}
                            />}
                            <Button  
                            label={actionLabel}
                            disabled={disabled}
                            onClick={handleSubmit}
                            />
                        </div>
                            {footer}
                        </div>
                    </div>    
                </div>

        </div>

    </div>
  )
}

export default Modal