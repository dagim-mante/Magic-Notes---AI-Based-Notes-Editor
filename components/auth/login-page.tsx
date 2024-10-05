'use client'
import { signIn } from "next-auth/react";
import {FaGoogle} from 'react-icons/fa'

export default function LoginComponent(){
    return (
        <div className="flex flex-col items-center p-5 max-w-md mx-auto mt-32">
            <div className="text-center">
                <h2 className="mb-3 text-xl md:text-2xl font-semibold leading-5 text-slate-900">
                    Login to your account
                </h2>
                <p className="mt-2 text-xs md:text-sm leading-4 text-slate-600">
                    You must be logged in to edit your notes.
                </p>
            </div>

            <button  
                className="rounded-lg mt-2 text-white max-w-56 md:max-w-64  bg-[#4285F4] hover:bg-[#4285F4]/90 focus:ring-4 focus:outline-none focus:ring-[#4285F4]/50 font-medium px-2 sm:px-5 py-2.5 text-center inline-flex items-center justify-between"
                onClick={() => signIn('google', {
                    redirect: false,
                    callbackUrl: '/notes'
                })}    
            >
                <span className="flex items-center justify-between gap-2">
                    <FaGoogle className="w-4 h-4" />
                    <span className="sm:text-sm text-xs">Continue with Google</span>
                </span>
            </button>
        </div>
    )
}