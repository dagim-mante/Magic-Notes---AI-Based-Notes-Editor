'use client'

import Link from "next/link"
import { useState } from "react"
import { X, Menu, User, LogOut } from "lucide-react"
import Image from "next/image"
import { Session } from "next-auth"

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { signOut } from "next-auth/react"

export default function NavBar({
    session
}: {
    session: Session | null
}){
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
                    {!session ? (
                        <Link className="hidden md:inline-block py-2 px-6 bg-blue-500 hover:bg-blue-600 text-sm text-white font-bold rounded-xl transition duration-200" href="/login">Get Started</Link>
                    ) : (
                        <div className="flex items-center">
                            <Link className="hidden md:inline-block mr-2 py-1 px-4 bg-blue-500 hover:bg-blue-600 text-sm text-white font-bold rounded-xl transition duration-200" href="/notes">Notes</Link>
                            <DropdownMenu>
                                <DropdownMenuTrigger>
                                    <Image 
                                        src={session.user?.image!}
                                        alt="User Profile Picture"
                                        width={50}
                                        height={50}
                                        className="w-7 h-7 rounded-full"
                                    />
                                </DropdownMenuTrigger>
                                <DropdownMenuContent>
                                    <DropdownMenuItem>
                                        <Link 
                                            href="/profile"
                                            className="flex items-center w-full p-1 rounded-sm hover:bg-primary hover:text-white"
                                        >
                                            <User className="w-4 h-4 mr-1" />
                                            <span>Profile</span>
                                        </Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem >
                                        <button
                                            onClick={() => signOut()}  
                                            className="flex items-center w-full p-1 rounded-sm hover:bg-destructive hover:text-white"
                                        >
                                            <LogOut className="w-4 h-4 mr-1" />
                                            <span>Log out</span>
                                        </button>
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                    )}
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
                            {!session ? (
                                <Link onClick={() => setMobileMenuOpen(false)} className="block px-4 py-3 mb-2 leading-loose text-xs text-center text-white font-semibold bg-blue-600 hover:bg-blue-700  rounded-xl" href="/login">Get Started</Link>
                            ) : (
                                <div>
                                    <Link onClick={() => setMobileMenuOpen(false)} className="block px-4 py-3 mb-2 leading-loose text-xs text-center text-white font-semibold bg-blue-600 hover:bg-blue-700  rounded-xl" href="/notes">Notes</Link>
                                    <Link 
                                        className="flex items-center w-full p-2 rounded-sm hover:bg-primary hover:text-white" 
                                        href="/profile"
                                    >
                                        <User className="w-4 h-4 mr-2" />
                                        <span>Profile</span>
                                    </Link>
                                    <button 
                                        className="flex items-center w-full p-2 rounded-sm hover:bg-destructive hover:text-white" 
                                        onClick={() => signOut()}
                                    >
                                        <LogOut className="w-4 h-4 mr-2" />
                                        <span>Log out</span>
                                    </button>
                                </div> 
                            )}
                        </div>
                    </div>
                </nav>
            </div>
        </>
    )
}