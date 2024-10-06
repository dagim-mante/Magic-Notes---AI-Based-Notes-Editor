'use client'

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
  
  
import { Plus } from "lucide-react"

import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import  axios, { AxiosError } from 'axios'
import { toast } from "sonner"
import { useRouter } from "next/navigation"

export default function NotesHeader(){
    const [title, setTitle] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [open, setOpen] = useState(false)
    const router = useRouter()

    // send request to create new note (/api/notes) POST
    const createNote = async () => {
        try{
            setIsLoading(true)
            toast.loading('Creating Note...⏳')
            const {data} = await axios.post('/api/notes', {
                title,
            })
            
            if(data.success){
                toast.dismiss()
                setIsLoading(false)
                setOpen(false)
                toast.success('Note created 🎉')
                router.refresh()
            }
        }catch(error: any){
            toast.dismiss()
            setIsLoading(false)
            if(error instanceof AxiosError && error.response){
                toast.error(`${error.response.data.error} 😔`)
            }else{
                toast.error(`Something went wrong. 😔`)
            }
        }
    } 

    return (
        <div className="flex gap-2 justify-between items-center mb-2">
            <h2 className="text-2xl">Your Notes</h2>
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                    <button className="text-sm flex items-center px-2 py-1 rounded-sm hover:bg-primary/75 bg-primary text-white">
                        <Plus className="w-4 h-4 mr-1"/>
                        <span>Add Note</span>
                    </button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>New Note</DialogTitle>
                        <DialogDescription>
                            Create a brand new note.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="flex items-center gap-2 w-full">
                        <Label htmlFor="name" className="mr-2">
                            Title:
                        </Label>
                        <Input
                            id="title"
                            placeholder="Shopping List"
                            value={title}
                            onChange={e => setTitle(e.target.value)}
                            onKeyDown={e => {
                                if(e.key === "Enter" && title !== ''){
                                    createNote()
                                }
                            }}
                            className="w-full"
                        />
                    </div>

                    <DialogFooter>
                        <Button
                            disabled={isLoading || title === ''} 
                            onClick={createNote}
                        >
                            Create
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    )
}