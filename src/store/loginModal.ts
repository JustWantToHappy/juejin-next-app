import {create} from 'zustand'

interface LoginModal<T extends ((...args:unknown[])=>unknown)>{
  open:boolean
  onClose: T
  onOpen:T
}

export const loginModal = create<LoginModal<()=>void>>(set => ({
  open:false,
  onClose: () => set({open:false}),
  onOpen:()=>set({open:true})
}))