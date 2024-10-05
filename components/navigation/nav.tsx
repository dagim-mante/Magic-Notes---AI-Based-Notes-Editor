'use client'

import Link from "next/link"
import { useState } from "react"
import { X, Menu } from "lucide-react"
import Image from "next/image"

export default function NavBar(){
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    return (
        <>
            <nav className="relative py-4 flex justify-between items-center bg-white">
                <Link className="text-3xl font-bold leading-none" href="/">
                    <Image 
                        src='/logo.svg'
                        alt='logo'
                        priority
                        width={50}
                        height={12}
                        className="h-12 w-36"
                    />
                </Link>
                <div className="flex items-center md:hidden">
                    <button onClick={() => setMobileMenuOpen(true)} className="navbar-burger flex items-center text-blue-600 p-3">
                        <Menu className="block h-6 w-6 fill-current self-end" />
                    </button>
                </div>
                <div className="hidden md:block">
                    <Link className="hidden md:inline-block py-2 px-6 bg-blue-500 hover:bg-blue-600 text-sm text-white font-bold rounded-xl transition duration-200" href="/login">Get Started</Link>
                </div>
            </nav>
            <div className={`navbar-menu relative z-50 ${mobileMenuOpen ? 'block': 'hidden'}`}>
                <div onClick={() => setMobileMenuOpen(false)} className="navbar-backdrop fixed inset-0 bg-gray-800 opacity-25"></div>
                <nav className="fixed top-0 left-0 bottom-0 flex flex-col w-5/6 max-w-sm py-6 px-6 bg-white border-r overflow-y-auto">
                    <div className="flex items-center mb-8">
                        <Link onClick={() => setMobileMenuOpen(false)} className="mr-auto text-3xl font-bold leading-none" href="/">
                            <Image 
                                src='/logo.svg'
                                alt='logo'
                                priority
                                width={50}
                                height={12}
                                className="h-12 w-32"
                            />
                        </Link>
                        <button onClick={() => setMobileMenuOpen(false)} className="navbar-close">
                            <X className="h-6 w-6 text-gray-400 cursor-pointer hover:text-gray-500" />
                        </button>
                    </div>
                    <div>
                        <div className="pt-6">
                            <Link onClick={() => setMobileMenuOpen(false)} className="block px-4 py-3 mb-2 leading-loose text-xs text-center text-white font-semibold bg-blue-600 hover:bg-blue-700  rounded-xl" href="/login">Get Started</Link>
                        </div>
                    </div>
                </nav>
            </div>
        </>
    )
}