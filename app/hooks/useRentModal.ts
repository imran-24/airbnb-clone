import {create} from 'zustand'

interface RentModal{
    isOpen: boolean;
    onClose: ()=> void;
    onOpen: ()=> void
}

const useRentModal = create<RentModal>((set)=>({
    isOpen: false,
    onClose: ()=> set({isOpen: false}),
    onOpen: ()=> set({isOpen: true})
}))

export default useRentModal