import {create} from 'zustand'
import {persist} from 'zustand/middleware'

type Data = {
  content?: string
  title?: string
  desc?: string
}

interface Props{
  data: Data
  setData(data:Data):void
} 

export const editorStore = create(persist<Props>(set => ({
  data: { title:'',desc:'',content:'' },
  setData(data: Data) {
    set((state)=>({data:{...state.data,...data}}))
  }
}), { name: 'editor' }))