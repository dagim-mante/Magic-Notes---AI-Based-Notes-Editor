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

import {
    ToggleGroup,
    ToggleGroupItem,
  } from "@/components/ui/toggle-group"
import { Checkbox } from "@/components/ui/checkbox"

  
  
import { Check, CirclePlus, Plus } from "lucide-react"

import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import  axios, { AxiosError } from 'axios'
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { NoteWithUser } from "@/lib/infer-type"

export const revalidate = 0

export default function NotesHeader({
    myNotes,
    setNotesState
}: {
    myNotes: NoteWithUser[],
    setNotesState: any
}){
    const [title, setTitle] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [open, setOpen] = useState(false)
    const [labelOpen, setLabelOpen] = useState(false)

    const [label, setLabel] = useState('')
    const [labelColor, setLabelColor] = useState('blue')
    const [labelNotes, setLabelNotes] = useState<[] | number[]>([])

    const [labelError, setLabelError] = useState<null | string>(null)

    const router = useRouter()
    const onlyNotes = myNotes.map(note => note.note)

    type LabelType = {
        label: string | null,
        labelColor: string | null
    }
    function removeDuplicateLabels(arr: LabelType[]) {
        const uniqueItems:LabelType[] = []
        arr.filter(item => {
          const isDuplicate = uniqueItems.some(uniqueItem => uniqueItem.label === item.label);
          if (!isDuplicate) {
            uniqueItems.push(item);
          }
        });
      
        return uniqueItems;
    }

    let myLabels:LabelType[] = myNotes.map(note => (
        {
            label: note.note.labelText,
            labelColor: note.note.labelColor
        }
    ))
    myLabels = removeDuplicateLabels(myLabels)
    myLabels = myLabels.filter(myLabel => myLabel.label !== null)


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
                router.push(`/notes/${data.success[0].id}`)
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

    const createLabel = async () => {
        setIsLoading(true)
        if(label.length === 0 || labelColor.length === 0){
            setIsLoading(false)
            setLabelError('Please Fill the whole form.')
            return
        }
        if(labelNotes.length === 0){
            setIsLoading(false)
            setLabelError('Please select atleast one note.')
            return
        }
        try{
            toast.loading('Creating Label...⏳')
            const {data} = await axios.post('/api/notes/label', {
                label,
                labelColor,
                labelNotes
            })

            setLabelNotes([])
            
            if(data.success){
                toast.dismiss()
                setIsLoading(false)
                setLabelOpen(false)
                toast.success('Label created 🎉')
            }
        }catch(error: any){
            toast.dismiss()
            setIsLoading(false)
            if(error instanceof AxiosError && error.response){
                toast.error(`${error.response.data.error} 😔`)
            }else{
                toast.error(`Something went wrong. 😔`)
            }
        }finally{
            router.refresh()
        }
    }

    return (
        <>
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
            <div className="w-full flex gap-1 px-2 py-1">
                <Dialog open={labelOpen} onOpenChange={setLabelOpen}>
                    <DialogTrigger asChild>
                        <button className="p-2 rounded-full">
                            <CirclePlus className="w-6 h-6" />
                        </button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                        <DialogTitle>Create a new Label</DialogTitle>
                        <DialogDescription>
                            Create a new label to attach to a note
                        </DialogDescription>
                        </DialogHeader>
                        <div className="flex items-center gap-2 w-full">
                            <Label htmlFor="name" className="font-bold mr-2">
                                Label:
                            </Label>
                            <Input
                                id="title"
                                placeholder="Goals"
                                value={label}
                                onChange={e => setLabel(e.target.value)}
                                className="w-full"
                            />
                        </div>
                        <div className="justify-self-start">
                            <ToggleGroup
                                value={labelColor} 
                                type="single"
                            >
                                <ToggleGroupItem variant={'outline'} className="rounded-full" value="blue" asChild>
                                    <button className='relative rounded-full' onClick={e => setLabelColor("blue")}>
                                        <div className="w-5 h-5 bg-blue-500 rounded-full"/>
                                        <Check className={`${labelColor !== 'blue' ? 'hidden' : 'block'} absolute w-4 h-4 top-2 text-white`} />
                                    </button>
                                </ToggleGroupItem>
                                <ToggleGroupItem variant={'outline'} className="rounded-full" value="red" asChild>
                                    <button  className='relative rounded-full' onClick={e => setLabelColor("red")}>
                                        <div className="w-5 h-5 bg-red-500 rounded-full"/>
                                        <Check className={`${labelColor !== 'red' ? 'hidden' : 'block'} absolute w-4 h-4 top-2 text-white`} />
                                    </button>
                                </ToggleGroupItem>
                                <ToggleGroupItem variant={'outline'} className="rounded-full" value="green" asChild>
                                    <button  className='relative rounded-full' onClick={e => setLabelColor("green")}>
                                        <div className="w-5 h-5 bg-green-500 rounded-full"/>
                                        <Check className={`${labelColor !== 'green' ? 'hidden' : 'block'} absolute w-4 h-4 top-2 text-white`} />
                                    </button>
                                </ToggleGroupItem>
                            </ToggleGroup>
                        </div>
                        <ScrollArea className="h-56 w-full rounded-md border">
                            <div className="p-4 w-full">
                                <h4 className="font-bold mb-4 text-sm leading-none">Notes</h4>
                                {onlyNotes.map((note) => (
                                    <div key={note.id}>
                                        <div className="flex items-center space-x-2">
                                            <Checkbox 
                                                onCheckedChange={e => {
                                                    if(labelNotes.length > 0 && labelNotes.includes(note.id)){
                                                        setLabelNotes(prev => prev.filter(noteId => noteId !== note.id))
                                                    }else{
                                                        setLabelNotes(prev => ([...prev, note.id]))
                                                    }
                                                }}
                                                id={`label_${note.id}`}
                                            />
                                            <label
                                                htmlFor={`label_${note.id}`}
                                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                            >
                                                {note.title}
                                            </label>
                                        </div>
                                        <Separator className="my-2" />
                                    </div>
                                ))}
                            </div>
                        </ScrollArea>
                            {labelError ? (
                                <div className='bg-red-500 rounded-md text-white w-full p-2'>
                                    {labelError}
                                </div>
                            ) : null}
                        <Button 
                            onClick={createLabel}
                            disabled={isLoading}
                            className="w-fit justify-self-end"
                        >
                            Add Label
                        </Button>
                    </DialogContent>
                </Dialog> 
                <>
                    {myLabels.map(label => (
                        <Badge
                            key={label.label} 
                            variant="outline"
                            className={`cursor-pointer bg-${label.labelColor}-500 text-white`}
                            onClick={() => {
                                setNotesState(myNotes.filter(note => note.note.labelText === label.label))
                            }}
                        >
                            {label.label}
                        </Badge>
                    ))}
                </>  
            </div>
        </>
    )
}