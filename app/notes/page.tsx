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
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
  
  
import { Ellipsis, Plus, SquarePen, Tag, Trash2 } from "lucide-react"
import Link from "next/link"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
  

export default function NotesPage(){
    return (
        <div>
            <div className="flex gap-2 justify-between items-center mb-2">
                <h2 className="text-2xl">Your Notes</h2>
                <Dialog>
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
                                className="w-full"
                            />
                        </div>

                        <DialogFooter>
                            <Button type="submit">Create</Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>
            <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                <div>
                    <Card>
                        <Link
                            href='#'
                        >
                            <CardHeader>
                                <CardTitle>
                                    <span className="overflow-ellipsis">Marefiya Improvments</span>
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-xs font-light">
                                    Lorem ipsum dolor, sit amet consectetur adipisicing elit. Repellendus rem laborum fugit nisi ipsam excepturi quaerat est quisquam et ut pariatur deserunt fuga, voluptas esse odit cupiditate, nemo, doloribus perspiciatis! Suscipit odit ullam tenetur vero.
                                </p>
                            </CardContent>
                        </Link>
                        <CardFooter>
                            <div className="w-full flex flex-col items-start">
                                <div aria-label="label" className="mb-3 border border-gray-800 rounded-md px-3 py-1 text-gray-800 dark:text-gray-400 dark:border-gray-700 text-xs flex items-center">
                                    <Tag className="w-4 h-4" />
                                    <p className="ml-2">To Dos</p>
                                </div>
                                <div className="flex items-center justify-between text-gray-800 dark:text-gray-100 w-full">
                                    <p className="text-sm">Two days ago</p>
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
            </div>
        </div>
    )
}