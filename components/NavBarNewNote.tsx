'use client'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogClose
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { useRouter } from "next/navigation"

export default function NavBarNewNote(){
    const [title, setTitle] = useState('')
    const router = useRouter()
    const handleRedirect = () => {
        router.push(`/add?title=${title}`)
        setTitle('')
    }
    return (
        <Dialog>
            <DialogTrigger className='bg-white p-2'>New Note</DialogTrigger>
            <DialogContent>
                <DialogHeader>
                <DialogTitle>Create new Note</DialogTitle>
                <DialogDescription>
                    <p className='mb-2'>What do we call it?</p>
                    <Input 
                        placeholder='Note title'
                        className='mb-2 text-bold'
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    <DialogClose asChild>
                        <Button disabled={title === ''} onClick={handleRedirect} className='w-full' variant='default'>
                            Create
                        </Button>
                    </DialogClose>
                </DialogDescription>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    )
}