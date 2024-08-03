import Link from 'next/link'

export default function Navbar(){
    return (
        <nav className='flex justify-between p-4 bg-black'>
            <Link href='/' className='text-white'>Magic Notes</Link>
            <div className='flex items-center'>
                <Link href='/signin' className='text-white mr-2'>Sign in</Link>
                <Link href='/signup' className='text-white mr-2'>Sign up</Link>
                <Link href='/add' className='bg-white p-2'>Add</Link>
            </div>
        </nav>
    )
}