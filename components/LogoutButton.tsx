'use client'

import { signOut } from "next-auth/react"

export default function LogoutButton(){
    return (
        <button onClick={() => signOut({
            redirect: true,
            callbackUrl: `${window.location.origin}/signin`
        })} className='bg-white p-2 ml-2'>Logout</button>
    )
}