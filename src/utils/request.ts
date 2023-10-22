import axios from 'axios'
import { FetcherResponse } from 'swr/_internal'
import { AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios'

axios.interceptors.request.use(config => {
  config.baseURL = 'http://localhost:3000'
  return config
}, (err: AxiosError) => Promise.reject(err.response?.data))

axios.interceptors.response.use((response) => {
  return response.data
}, (err: AxiosError) => Promise.reject(err?.message || err?.code))

export const Get = <T>(url: string, config?: AxiosRequestConfig) => axios.get<T>(url, config) as FetcherResponse<T>

export const Post = <U, T>(url: string, data: U, config?: AxiosRequestConfig) =>
  new Promise(resolve => {
    axios.post<T>(url, data, config).then(resolve).catch(resolve)
  })

export const Patch = <U, T>(url: string, data?: U, config?: AxiosRequestConfig) =>
  new Promise(resolve => {
    axios.patch<T>(url, data, config).then(resolve).catch(resolve)
  })

//type:<T>(url: string, config?: AxiosRequestConfig)=>Promise<AxiosResponse<T>>
export const Delete = <T>(url: string, config?: AxiosRequestConfig) =>
  new Promise(resolve => {
    axios.delete<T>(url, config).then(resolve).catch(resolve)
  })

export const Put = <U, T>(url: string, data?: U, config?: AxiosRequestConfig) => {
  return new Promise(resolve => {
    axios.put<T>(url, data, config).then(resolve).catch(resolve)
  })
}









