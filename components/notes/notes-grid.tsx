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

import { Ellipsis, SquarePen, Tag, Trash2 } from "lucide-react"
import Link from "next/link"

import { NoteWithUser } from "@/lib/infer-type";

export default function NotesGrid({
    myNotes
} : {
    myNotes: NoteWithUser[]
}){
    return (
        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {myNotes.map(myNote => (
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
                                    className="text-xs font-light"
                                />
                            </CardContent>
                        </Link>
                        <CardFooter>
                            <div className="w-full flex flex-col items-start">
                                <div aria-label="label" className="mb-3 border border-gray-800 rounded-md px-3 py-1 text-gray-800 dark:text-gray-400 dark:border-gray-700 text-xs flex items-center">
                                    <Tag className="w-4 h-4" />
                                    <p className="ml-2">To Dos</p>
                                </div>
                                <div className="flex items-center justify-between text-gray-800 dark:text-gray-100 w-full">
                                    <p className="text-sm">{myNote.note.updated?.toDateString()}</p>
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <button className="rounded-sm px-2 py-1 bg-secondary-foreground text-white flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-offset-2  focus:ring-black" aria-label="edit note" role="button">
                                                <Ellipsis className="w-4 h-4" />
                                            </button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent>
                                            <DropdownMenuItem>
                                                <Link 
                                                    href="#"
                                                    className="flex items-center gap-2 w-full p-1 rounded-sm hover:bg-primary hover:text-white"
                                                >
                                                    <SquarePen className="w-4 h-4" />
                                                    <span>Edit</span>
                                                </Link>
                                            </DropdownMenuItem>
                                            <DropdownMenuItem >
                                                <button 
                                                    className="flex items-center gap-2 w-full p-1 rounded-sm hover:bg-destructive hover:text-white"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                    <span>Delete</span>
                                                </button>
                                            </DropdownMenuItem>
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