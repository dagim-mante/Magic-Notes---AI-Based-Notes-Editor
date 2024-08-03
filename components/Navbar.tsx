import db from '@/libs/db'
import { getServerSession } from 'next-auth'
import Link from 'next/link'
import LogoutButton from '@/components/LogoutButton'

export default async function Navbar(){
    const session = await getServerSession(db)
    
    return (
        <nav className='flex justify-between p-4 bg-black'>
            <Link href='/' className='text-white'>Magic Notes</Link>
            <div className='flex items-center'>
                {session ? (
                    <>
                        <Link href='/add' className='bg-white p-2'>Add</Link>
                        <LogoutButton />
                    </>
                ) : (
                    <>
                        <Link href='/signin' className='text-white mr-2'>Sign in</Link>
                        <Link href='/signup' className='text-white mr-2'>Sign up</Link>
                    </>
                )}
            </div>
        </nav>
    )
}