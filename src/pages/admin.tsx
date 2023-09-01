import React from 'react'
import axios, { AxiosPromise } from 'axios'
import useSwr, { Fetcher } from 'swr'
import { Get, Post } from '../utils/request'
import { useForm, SubmitErrorHandler } from 'react-hook-form'

const Admin = () => {
  const fetcher: Fetcher<{ name: string }> = (url: string) => Get<{ name: string }>(url)
  const { data, error, isLoading } = useSwr('/api/tag', fetcher)
  const { register, setValue, handleSubmit, formState } = useForm<{ key: string, name: string }>()
  const onSubmit = handleSubmit(data => {
    Post('/api/tag', data).then(console.info).catch(console.info)
  })

  return (
    <div>
      {/*<form onSubmit={onSubmit}>
        <label>key</label>
        <input {...register('key')} />
        <label>name</label>
        <input {...register('name')} />
        <button>添加tag</button>
      </form>*/}
    </div>
  )
}

export default Admin