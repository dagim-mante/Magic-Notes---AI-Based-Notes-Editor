'use client'
import Link from 'next/link'
import { useState } from 'react'
import {useRouter} from 'next/navigation'
import { signIn } from 'next-auth/react'

export default function Signin(){
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const router = useRouter()

    const handleSubmit = async (e) => {
        e.preventDefault()
        const signinData = await signIn('credentials', {
            email,
            password,
            redirect: false
        })

        if(signinData?.error){
            console.log(signinData)
        }else{
            router.push('/')
            router.refresh()
        }
    } 

    return (
        <>
            <h2 className='text-xl mb-2'>Login</h2>
            <form onSubmit={handleSubmit} className="flex flex-col gap-2">
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
                <button className="bg-green-500 px-6 py-2 w-fit text-white">Log in</button>
                <span className='text-[16px] text-slate-500'>
                    Don't have an account yet?
                    <Link href='/signup' className='ml-2 text-blue-800 hover:underline'>Sign up</Link>
                </span>
            </form>
        </>
    )
}