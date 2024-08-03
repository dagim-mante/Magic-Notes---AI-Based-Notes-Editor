import Link from "next/link";

export default function Signin(){
    return (
        <>
            <h2 className='text-xl mb-2'>Login</h2>
            <form className="flex flex-col gap-2">
                <div>
                    <label htmlFor='email'>Email: </label>
                    <input id='email' type='text' className="border border-slate-500 px-2 py-1 w-full"/>
                </div>
                <div>
                    <label htmlFor='password'>Password: </label>
                    <input id='password' type='password' className="border border-slate-500 px-2 py-1 w-full"/>
                </div>
                <button className="bg-green-500 px-6 py-2 w-fit text-white">Log in</button>
                <span className='text-[16px] text-slate-500'>
                    Don't have an account yet?
                    <Link href='/signup' className='ml-2 text-blue-800 hover:underline'>Sign up</Link>
                </span>
            </form>
        </>
    )
}