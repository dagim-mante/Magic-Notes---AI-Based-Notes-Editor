import Link from 'next/link'

export default function Navbar(){
    return (
        <nav className='flex justify-between p-4 bg-black'>
            <Link href='/' className='text-white'>Magic Notes</Link>
            <Link href='/add' className='bg-white p-2'>Add</Link>
        </nav>
    )
}