import {create} from 'zustand'
import type {CatelogueType } from '@/types'

interface CatelogueStore{
  catelogue:CatelogueType[]
  setCatelogue:(catelogue:CatelogueType[])=>void
}

export const catelogueStore = create<CatelogueStore>(set => ({
  catelogue: [],
  setCatelogue:(catelogue)=> set({catelogue})
}))