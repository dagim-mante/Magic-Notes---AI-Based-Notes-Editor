'use client'

import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"  

import { BookmarkX, Ellipsis, SquareArrowOutUpRight, Tag, Trash2 } from "lucide-react"
import Link from "next/link"

import { NoteWithUser } from "@/lib/infer-type";
import axios, { AxiosError } from "axios";
import { useState } from "react"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import {formatDistance} from "date-fns"

export const revalidate = 0

export default function NotesGrid({
    myNotes
} : {
    myNotes: NoteWithUser[]
}){
    const [deleteOpen, setDeleteOpen] = useState(false)
    const [removeLabelOpen, setRemoveLabelOpen] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const router = useRouter()


    const deleteNote = async (id: number) => {
        try{
            setIsLoading(true)
            toast.loading('Deleting Note...⏳')
            const {data} = await axios.delete(`/api/notes/${id}`)
            
            if(data.success){
                toast.dismiss()
                setIsLoading(false)
                toast.success('Note Deleted ❌')
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

    const RemoveLabel = async (id: number) => {
        try{
            setIsLoading(true)
            toast.loading('Removing Label...⏳')
            const {data} = await axios.post(`/api/notes/label`, {
                labelNotes: [id],
                label: null,
                labelColor: null 
            })
            
            if(data.success){
                toast.dismiss()
                setIsLoading(false)
                toast.success('Label Removed ❌')
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

    const sortedNotes = myNotes.sort((a, b) => new Date(b?.note?.updated!) - new Date(a?.note?.updated!))
    
    return (
        <div className="mt-2 grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {sortedNotes.map(myNote => (
                <div key={myNote.noteId}>
                    <Card>
                        <Link
                            href={`/notes/${myNote.noteId}`}
                        >
                            <CardHeader>
                                <CardTitle>
                                    <span className="overflow-ellipsis">{myNote.note.title}</span>
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div 
                                    dangerouslySetInnerHTML={{ __html: myNote.note.content ? myNote.note.content : ''}}
                                    className="text-xs font-light max-h-16 overflow-hidden"
                                />
                            </CardContent>
                        </Link>
                        <CardFooter>
                            <div className="w-full flex flex-col items-start">
                                {myNote.note.labelText ? (
                                    <div aria-label="label" className={`bg-${myNote.note.labelColor}-500 mb-3 border rounded-md px-3 py-1 text-white dark:text-gray-400 dark:border-gray-700 text-xs flex items-center`}>
                                        <Tag className="w-4 h-4" />
                                        <p className="ml-2 font-bold tracking-wider">{myNote.note.labelText}</p>
                                    </div>
                                ) : null}
                                <div className="flex items-center justify-between text-gray-800 dark:text-gray-100 w-full">
                                    <p className="text-sm">{formatDistance(myNote.note.updated!, new Date())} ago</p>
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <button className="rounded-sm px-2 py-1 bg-secondary-foreground text-white flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-offset-2  focus:ring-black" aria-label="edit note" role="button">
                                                <Ellipsis className="w-4 h-4" />
                                            </button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent>
                                            <DropdownMenuItem>
                                                <Link 
                                                    href={`/notes/${myNote.noteId}`}
                                                    target="_blank"
                                                    className="flex items-center gap-2 w-full p-1 rounded-sm hover:bg-primary hover:text-white"
                                                >
                                                    <SquareArrowOutUpRight className="w-4 h-4" />
                                                    <span>Open in new tab</span>
                                                </Link>
                                            </DropdownMenuItem>
                                               <AlertDialog open={deleteOpen} onOpenChange={setDeleteOpen}>
                                                    <AlertDialogTrigger 
                                                        asChild
                                                    >
                                                        <button
                                                            className="flex items-center gap-2 w-full py-1 px-[10px] rounded-sm hover:bg-destructive hover:text-white"
                                                        >
                                                            <Trash2 className="w-4 h-4" />
                                                            <span>Delete</span>
                                                        </button>
                                                    </AlertDialogTrigger>
                                                    <AlertDialogContent>
                                                        <AlertDialogHeader>
                                                        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                                        <AlertDialogDescription>
                                                            This will permanently delete your note.
                                                        </AlertDialogDescription>
                                                        </AlertDialogHeader>
                                                        <AlertDialogFooter>
                                                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                            <AlertDialogAction 
                                                                onClick={() => deleteNote(myNote.noteId)}
                                                                className="bg-destructive"
                                                            >
                                                                Delete
                                                            </AlertDialogAction>
                                                        </AlertDialogFooter>
                                                    </AlertDialogContent>
                                                </AlertDialog>
                                                {myNote.note.labelText ? (
                                                    <AlertDialog open={removeLabelOpen} onOpenChange={setRemoveLabelOpen}>
                                                        <AlertDialogTrigger 
                                                            asChild
                                                        >
                                                            <button
                                                                className="flex items-center gap-2 w-full py-1 px-[10px] rounded-sm hover:bg-destructive hover:text-white"
                                                            >
                                                                <BookmarkX className="w-4 h-4" />
                                                                <span>Remove Label</span>
                                                            </button>
                                                        </AlertDialogTrigger>
                                                        <AlertDialogContent>
                                                            <AlertDialogHeader>
                                                            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                                            <AlertDialogDescription>
                                                                This will permanently remove your tag.
                                                            </AlertDialogDescription>
                                                            </AlertDialogHeader>
                                                            <AlertDialogFooter>
                                                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                                <AlertDialogAction 
                                                                    onClick={() => RemoveLabel(myNote.noteId)}
                                                                    className="bg-destructive"
                                                                >
                                                                    Remove
                                                                </AlertDialogAction>
                                                            </AlertDialogFooter>
                                                        </AlertDialogContent>
                                                    </AlertDialog>
                                                ) : null}
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </div>
                            </div>
                        </CardFooter>
                    </Card>
                </div>
            ))}
        </div>
    )
}