'use client'
import Link from 'next/link'
import { useState } from 'react'
import {useRouter} from 'next/navigation'

export default function Signup(){
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const router = useRouter()

    const handleSubmit = async (e) => {
        e.preventDefault()
        const res = await fetch('http://localhost:3000/api/user', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({username, email, password, confirmPassword})
        })

        if(res.ok){
            router.push('/signin')
        }else{
            const {message} = await res.json()
            console.log(message)
        }
    } 

    return (
        <>
            <h2 className='text-xl mb-2'>Signup</h2>
            <form onSubmit={handleSubmit} className="flex flex-col gap-2">
                <div>
                    <label htmlFor='username'>Username: </label>
                    <input
                        value={username}
                        onChange={(e) => setUsername(e.target.value)} 
                        id='username'
                        type='text'
                        className="border border-slate-500 px-2 py-1 w-full"
                    />
                </div>
                <div>
                    <label htmlFor='email'>Email: </label>
                    <input
                        value={email}
                        onChange={(e) => setEmail(e.target.value)} 
                        id='email' 
                        type='text' 
                        className="border border-slate-500 px-2 py-1 w-full"
                    />
                </div>
                <div>
                    <label htmlFor='password'>Password: </label>
                    <input 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)} 
                        id='password'
                        type='password' 
                        className="border border-slate-500 px-2 py-1 w-full"
                    />
                </div>
                <div>
                    <label htmlFor='confirmPassword'>Confirm Password: </label>
                    <input
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)} 
                        id='confirmPassword' 
                        type='password' 
                        className="border border-slate-500 px-2 py-1 w-full"
                    />
                </div>
                <button className="bg-green-500 px-6 py-2 w-fit text-white">Sign up</button>
                <span className='text-[16px] text-slate-500'>
                    Already have an account?
                    <Link href='/signin' className='ml-2 text-blue-800 hover:underline'>Sign in</Link>
                </span>
            </form>
        </>
    )
}