import {Method } from '@/constants'

export const isProtectedApi = (method:Method=Method.GET,...expectedMethods:Method[]) => {
  const {POST,DELETE,PUT }=Method
  const proctedMethods=[POST, DELETE, PUT].filter(method=>!expectedMethods.includes(method))
  if (proctedMethods.includes(method)) return true
  return false
}