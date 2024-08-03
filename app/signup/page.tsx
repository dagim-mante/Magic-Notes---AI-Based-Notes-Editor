import Link from 'next/link'

export default function Signup(){
    return (
        <>
            <h2 className='text-xl mb-2'>Signup</h2>
            <form className="flex flex-col gap-2">
                <div>
                    <label htmlFor='username'>Username: </label>
                    <input id='username' type='text' className="border border-slate-500 px-2 py-1 w-full"/>
                </div>
                <div>
                    <label htmlFor='email'>Email: </label>
                    <input id='email' type='text' className="border border-slate-500 px-2 py-1 w-full"/>
                </div>
                <div>
                    <label htmlFor='password'>Password: </label>
                    <input id='password' type='password' className="border border-slate-500 px-2 py-1 w-full"/>
                </div>
                <button className="bg-green-500 px-6 py-2 w-fit text-white">Sign up</button>
                <span className='text-[16px] text-slate-500'>
                    Already have an account?
                    <Link href='/signin' className='ml-2 text-blue-800 hover:underline'>Sign in</Link>
                </span>
            </form>
        </>
    )
}