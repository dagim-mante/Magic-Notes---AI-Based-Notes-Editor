'use client'
import Link from 'next/link'
import {useRouter} from 'next/navigation'
import { SubmitHandler, useForm } from 'react-hook-form'
import { z, ZodType } from "zod"
import { zodResolver } from "@hookform/resolvers/zod";

type Formfields = {
    username: string
    email: string
    password: string
    confirmPassword: string
}

const userSchema:ZodType<Formfields> = z
    .object({
        username: z
            .string()
            .min(1, 'Please enter a username')
            .min(4, 'Username needs minimum of 4 charchters.')
            .max(10, 'Username must have maximum of 10 charchters.'),
        email : z
            .string()
            .min(1, 'Please enter an email address.')
            .email(),
        password: z
            .string()
            .min(1, 'Please enter a password')
            .min(8, 'Password needs minimum of 8 charchters.')
            .max(20, 'Password must have maximum of 20 charchters.'),
        confirmPassword: z
            .string()
            .min(1, 'Please confirm your password.')
    }).refine(data => data.password === data.confirmPassword , {
        message: 'Passwords don\'t match.',
        path: ['confirmPassword']
    })

export default function Signup(){
    const {
        register,
        handleSubmit,
        setError,
        formState: {errors, isSubmitting}
    } = useForm<Formfields>({
        resolver: zodResolver(userSchema)
    })

    const router = useRouter()

    const handleSubmitHandler:SubmitHandler<Formfields> = async (data) => {
        const res = await fetch('http://localhost:3000/api/user', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: data.username,
                email: data.email,
                password: data.password,
                confirmPassword: data.confirmPassword
            })            
        })

        if(res.ok){
            router.push('/signin')
        }else{
            const {message} = await res.json()
            setError('root', {message})
        }
    } 

    return (
        <>
            <h2 className='text-xl mb-2'>Signup</h2>
            {errors.root && <div className='text-red-500'>{errors.root.message}</div>}
            <form onSubmit={handleSubmit(handleSubmitHandler)} className="flex flex-col gap-2">
                <div>
                    <label htmlFor='username'>Username: </label>
                    <input
                        {...register('username')}
                        id='username'
                        type='text'
                        className="border border-slate-500 px-2 py-1 w-full"
                    />
                    {errors.username && <div className='text-red-500'>{errors.username.message}</div>}
                </div>
                <div>
                    <label htmlFor='email'>Email: </label>
                    <input
                        {...register('email')}
                        id='email' 
                        type='text' 
                        className="border border-slate-500 px-2 py-1 w-full"
                    />
                    {errors.email && <div className='text-red-500'>{errors.email.message}</div>}
                </div>
                <div>
                    <label htmlFor='password'>Password: </label>
                    <input 
                        {...register('password')}
                        id='password'
                        type='password' 
                        className="border border-slate-500 px-2 py-1 w-full"
                    />
                    {errors.password && <div className='text-red-500'>{errors.password.message}</div>}
                </div>
                <div>
                    <label htmlFor='confirmPassword'>Confirm Password: </label>
                    <input
                        {...register('confirmPassword')}
                        id='confirmPassword' 
                        type='password' 
                        className="border border-slate-500 px-2 py-1 w-full"
                    />
                    {errors.confirmPassword && <div className='text-red-500'>{errors.confirmPassword.message}</div>}
                </div>
                <button
                    disabled={isSubmitting}
                    className={`${isSubmitting ? 'bg-gray-500': 'bg-green-500'} px-6 py-2 w-fit text-white`}
                >
                    {isSubmitting ? 'Signing up...' : 'Sign up'}
                </button>
                <span className='text-[16px] text-slate-500'>
                    Already have an account?
                    <Link href='/signin' className='ml-2 text-blue-800 hover:underline'>Sign in</Link>
                </span>
            </form>
        </>
    )
}