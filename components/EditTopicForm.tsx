'use client'
import {useRouter} from 'next/navigation'
import { useState } from 'react'
import Tiptap from './editor/Tiptap'

interface EditTopicFormProps{
    id: string,
    title: string,
    description: string
}

const EditTopicForm:React.FC<EditTopicFormProps> = ({
    id, title, description
}) => {
    const router = useRouter()
    const [newTitle, setNewTitle] = useState(title)
    const [newDescription, setNewDescription] = useState(description)
     const handleSubmit = async (e) => {
        e.preventDefault()
        try{
        const res = await fetch(`http://localhost:3000/api/topics/${id}`, {
            cache: 'no-cache',
            method: 'PUT',
            headers: {
            'Content-Type': 'application/json'
            },
            body: JSON.stringify({newTitle, newDescription})
        })

        if(res.ok){
            router.push('/')
            router.refresh()
        }else{
            throw new Error('failed to edit topic.')
        }
        }catch(error){
            console.log(error)
        }
    }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <input 
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            type='text'
            placeholder="Topic Title"
            className="px-2 py-4 border border-slate-500"
        />
        <input 
            value={newDescription}
            onChange={(e) => setNewDescription(e.target.value)}
            type='text'
            placeholder="Topic Description"
            className="px-2 py-4 border border-slate-500"
        />
        <button className="bg-green-600 py-4 px-6 w-fit text-white">Update</button>
    </form>
  )
}

export default EditTopicForm