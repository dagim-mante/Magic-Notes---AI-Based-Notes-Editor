'use client'

import { useSession } from "next-auth/react"

export default function UserDashboard(){
    const {data: session, status} = useSession()
    if(status === 'loading'){
        return <p>Loading...</p>
    }
    return (
        <h2>Welcome to your notes {session?.user.username}</h2>
    )
}