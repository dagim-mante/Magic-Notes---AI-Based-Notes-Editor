'use client'
import Tiptap from '@/components/editor/Tiptap'
import { useRouter } from 'next/navigation'
import {useState} from 'react'

const Add = () => {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const router = useRouter()

  const handleSubmit = async (e) => {
    e.preventDefault()
    try{
      const res = await fetch('http://localhost:3000/api/topics', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({title, description})
      })

      if(res.ok){
        router.push('/')
        router.refresh()
      }else{
        throw new Error('failed to add topic.')
      }
    }catch(error){
      console.log(error)
    }
  }

  return (
    <>
        <h2 className="text-xl">Add Topic</h2>
        <Tiptap />
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
            <input 
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                type='text'
                placeholder="Topic Title"
                className="px-2 py-4 border border-slate-500"
            />
            <input 
              value={description}
              onChange={(e) => setDescription(e.target.value)}
                type='text'
                placeholder="Topic Description"
                className="px-2 py-4 border border-slate-500"
            />
            <button className="bg-green-600 py-4 px-6 w-fit text-white">Add</button>
        </form>
    </> 
  )
}

export default Add