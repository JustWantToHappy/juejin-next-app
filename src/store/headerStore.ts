import {create} from 'zustand'

interface Header<T extends ((...args:unknown[])=>unknown)>{
  close: boolean
  onClose: T
  onOpen:T
}

export const headerStore = create<Header<()=>void>>(set => ({
  close: false,
  onClose: () => set({close:true}),
  onOpen:()=>set({close:false})
}))