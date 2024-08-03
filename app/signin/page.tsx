'use client'
import Link from 'next/link'
import {useRouter} from 'next/navigation'
import { signIn } from 'next-auth/react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { z, ZodType } from "zod"
import { zodResolver } from "@hookform/resolvers/zod";

type FormFields = {
    email: string
    password: string
}

const formSchema:ZodType<FormFields> = z
    .object({
        email : z
            .string()
            .min(1, 'Please enter an email.')
            .email(),
        password: z
            .string()
            .min(1, {message: 'Please enter a password'})
            .min(8, {message: 'Password must be a minimum of 8 charachters'})
    })

export default function Signin(){
    const {
        register,
        handleSubmit,
        setError,
        formState: {errors, isSubmitting}
    } = useForm<FormFields>({
        resolver: zodResolver(formSchema)
    })

    const router = useRouter()

    const handleSubmitRequest:SubmitHandler<FormFields> = async (data) => {
        const signinData = await signIn('credentials', {
            email: data.email,
            password: data.password,
            redirect: false
        })

        if(signinData?.error){
            setError('root', {message: 'Unsuccesful Login!'})
        }else{
            router.push('/')
            router.refresh()
        }
    } 

    return (
        <>
            <h2 className='text-xl mb-2'>Login</h2>
            {errors.root && <div className='text-red-500'>{errors.root.message}</div>}
            <form onSubmit={handleSubmit(handleSubmitRequest)} className="flex flex-col gap-2">
                <div>
                    <label htmlFor='email'>Email: </label>
                    <input
                        {...register('email')}
                        id='email' 
                        type='text' 
                        className={`border ${errors.email ? 'border-red-500': 'border-slate-500'} px-2 py-1 w-full`}
                    />
                    {errors.email && <div className='text-red-500'>{errors.email.message}</div>}
                </div>
                <div>
                    <label htmlFor='password'>Password: </label>
                    <input 
                        {...register('password')}
                        id='password'
                        type='password' 
                        className={`border ${errors.password ? 'border-red-500': 'border-slate-500'} px-2 py-1 w-full`}
                    />
                    {errors.password && <div className='text-red-500'>{errors.password.message}</div>}
                </div>
                <button 
                    disabled={isSubmitting}
                    className={`${isSubmitting ? 'bg-gray-500' : 'bg-green-500'} px-6 py-2 w-fit text-white`}
                >
                    {isSubmitting ? 'Logging in...' : 'Log in'}
                </button>
                <span className='text-[16px] text-slate-500'>
                    Don't have an account yet?
                    <Link href='/signup' className='ml-2 text-blue-800 hover:underline'>Sign up</Link>
                </span>
            </form>
        </>
    )
}