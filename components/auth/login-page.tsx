'use client'
import { signIn } from "next-auth/react";

export default function LoginComponent(){
    return (
        <button onClick={() => signIn('google')}>Login with Google</button>
    )
}