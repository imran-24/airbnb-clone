import {create} from 'zustand'

interface LoginModal{
    isOpen: boolean;
    onClose: ()=> void;
    onOpen: ()=> void
}

const useLoginModal = create<LoginModal>((set)=>({
    isOpen: false,
    onClose: ()=> set({isOpen: false}),
    onOpen: ()=> set({isOpen: true})
}))

export default useLoginModal