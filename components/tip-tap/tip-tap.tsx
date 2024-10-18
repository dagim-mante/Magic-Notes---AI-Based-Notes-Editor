'use client'

import { NoteWithUser } from '@/lib/infer-type'
import { cn } from '@/lib/utils'
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import axios from 'axios'
import { BadgeCheck, Bold, Heading1, Heading2, Heading3, Italic, List, ListOrdered, Loader, Save } from 'lucide-react'
import { useCallback, useEffect, useState } from 'react'
import Chat from './chat-container'

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

import { Button } from "@/components/ui/button"
import ChatMobile from './chat-container-mobile'


function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height
  };
}

function useWindowDimensions() {
  const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowDimensions;
}

const Tiptap = ({
    myNote
}: {
    myNote: NoteWithUser
}) => {
  const [saving, setSaving] = useState(false)
  const [assistantOpen, setAssistantOpen] = useState<boolean>(false)
  const { height, width } = useWindowDimensions();

  const handleKeyPress = useCallback((event: any) => {
    if(event.ctrlKey){
      if(event.key === 'm' || event.key === 'M'){
        setAssistantOpen(prev => !prev)
      }
    }
  }, []);
  
  useEffect(() => {
    // attach the event listener
    document.addEventListener('keydown', handleKeyPress);

    // remove the event listener
    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, [handleKeyPress]);

  const editor = useEditor({
    immediatelyRender: false,
    editorProps: {
      attributes: {
        class: 'prose prose-sm sm:prose lg:prose-lg xl:prose-2xl mx-auto focus:outline-none',
      }
    },
    extensions: [
      StarterKit.configure({
        bulletList: {
          keepMarks: true,
          keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
        },
        orderedList: {
          keepMarks: true,
          keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
        },
      })
    ],
    content: myNote.note.content ? myNote.note.content : '',
    onUpdate({ editor }){
      console.log("update")
      if(saving){
        return
      }else{
        setSaving(true)
        setTimeout(async () => {
          console.log("Save to db")
          const res = await axios.put('/api/notes', {
            id: myNote.noteId,
            content: editor.getHTML() 
          })
          console.log(res)
          setSaving(false)
        }, 10000)
      }
    }
  })

  if(!editor){
    return null
  }

  const manualSave = async () => {
    if(saving){
      return
    }else{
      setSaving(true)
      console.log("Save to db")
      const res = await axios.put('/api/notes', {
        id: myNote.noteId,
        content: editor.getHTML() 
      })
      console.log(res)
      setSaving(false)
    }
  }

  return (
    <div className="flex">
      <div className={`${assistantOpen ? 'w-4/6' : 'w-full'}`}>  
        <div className="mt-4 relative flex flex-col items-center">
          <header 
            className="z-30 fixed top-14 max-w-md mx-auto rounded-sm w-full border-gray-100 bg-white/80 py-3 px-1  backdrop-blur-lg shadow"
          >
            <div className="flex flex-wrap gap-[4px]">
              <p className='flex items-center gap-[2px] mr-1'>
                {saving ? (
                  <>
                    <Loader className="w-4 h-4 animate-spin"/>
                    <span className="text-xs">Saving</span>
                  </>
                ) : (
                  <>
                    <BadgeCheck className="w-4 h-4"/>
                    <span className="text-xs">Saved</span>
                  </>
                )}
              </p>
              <button
                className="p-1 rounded-sm bg-secondary hover:bg-primary hover:text-white"
                  disabled={saving}
                  onClick={manualSave}
              >
                <Save className="w-4 h-4"/>
              </button>
              <button
                onClick={() => editor.chain().focus().toggleBold().run()}
                disabled={
                  !editor.can()
                    .chain()
                    .focus()
                    .toggleBold()
                    .run()
                }
                className={cn('p-1 rounded-sm', editor.isActive('bold') ? 'bg-primary text-white' : 'bg-secondary')}
              >
                <Bold className="w-4 h-4" />
              </button>

              <button
                onClick={() => editor.chain().focus().toggleItalic().run()}
                disabled={
                  !editor.can()
                    .chain()
                    .focus()
                    .toggleItalic()
                    .run()
                }
                className={cn('p-1 rounded-sm', editor.isActive('italic') ? 'bg-primary text-white' : 'bg-secondary')}
              >
                <Italic className="w-4 h-4" />
              </button>
              <button
                onClick={() => editor.chain().focus().setParagraph().run()}
                className={cn('py-1 px-2 rounded-sm', editor.isActive('paragraph') ? 'bg-primary text-white' : 'bg-secondary')}
              >
                P
              </button>
              <button
                onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
                className={cn('p-1 rounded-sm', editor.isActive('heading', { level: 1 }) ? 'bg-primary text-white' : 'bg-secondary')}
              >
                <Heading1 className="w-4 h-4" />
              </button>
              <button
                onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                className={cn('p-1 rounded-sm', editor.isActive('heading', { level: 2 }) ? 'bg-primary text-white' : 'bg-secondary')}
              >
                <Heading2 className="w-4 h-4" />
              </button>
              <button
                onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
                className={cn('p-1 rounded-sm', editor.isActive('heading', { level: 3 }) ? 'bg-primary text-white' : 'bg-secondary')}
              >
                <Heading3 className="w-4 h-4" />
              </button>
              <button
                onClick={() => editor.chain().focus().toggleBulletList().run()}
                className={cn('p-1 rounded-sm', editor.isActive('bulletList') ? 'bg-primary text-white' : 'bg-secondary')}
              >
                <List className="w-4 h-4" />
              </button>
              <button
                onClick={() => editor.chain().focus().toggleOrderedList().run()}
                className={cn('p-1 rounded-sm', editor.isActive('orderedList') ? 'bg-primary text-white' : 'bg-secondary')}
              >
                <ListOrdered className="w-4 h-4" />
              </button>
              <button
                onClick={() => setAssistantOpen(prev => !prev)}
                className={cn('p-1 rounded-sm', assistantOpen ? 'bg-primary text-white' : 'bg-secondary')}
              >
                <span className="w-4 h-4">✨</span>
              </button>
            </div>
          </header>
        </div>
        <EditorContent className="mt-8" editor={editor} />
      </div>
      <div className="flex-1 lg:block hidden w-2/6 h-full">
        <div className={`${assistantOpen ? ' block' : 'hidden'} z-50 h-[calc(100vh-6rem)] flex flex-col border rounded-lg shadow-lg`}>          
          <Chat />
        </div>
      </div>
      <div className="flex-1 lg:hidden block h-full">
        <Sheet open={assistantOpen && width < 1024} onOpenChange={setAssistantOpen}>
          <SheetTrigger asChild>
            <Button 
                variant="outline"
                className="hidden"
              >
                Open
              </Button>
          </SheetTrigger>
          <SheetContent>
            <SheetTitle className="hidden" />
            <SheetDescription className="hidden" />
            <div className={`${assistantOpen ? ' block' : 'hidden'} z-50 h-[calc(100vh-3rem)] flex flex-col border rounded-lg shadow-lg`}>          
              <ChatMobile />
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  )
}

export default Tiptap
