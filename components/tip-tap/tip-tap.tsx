'use client'

import { NoteWithUser } from '@/lib/infer-type'
import { cn } from '@/lib/utils'
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { BadgeCheck, Bold, Heading1, Heading2, Heading3, Italic, List, ListOrdered, Loader, Save } from 'lucide-react'

const Tiptap = ({
    myNote
}: {
    myNote: NoteWithUser
}) => {
  const editor = useEditor({
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
    content: myNote.note.content ? myNote.note.content : ''
  })

  if(!editor){
    return null
  }

  return (
    <>
      <div className="mt-4 relative flex flex-col items-center">
        <header 
          className="z-30 fixed top-14 max-w-2xl lg:max-w-3xl mx-auto rounded-sm w-full border-gray-100 bg-white/80 py-3 px-1  backdrop-blur-lg shadow"
        >
          <div className="flex flex-wrap gap-[4px]">
            <p className='flex items-center gap-[2px] mr-1'>
              {/* <Loader className="w-4 h-4 animate-spin"/>
              <span className="text-xs">Saving</span> */}
              <BadgeCheck className="w-4 h-4"/>
              <span className="text-xs">Saved</span>
            </p>
            <button
              className="p-1 rounded-sm bg-secondary hover:bg-primary hover:text-white"
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
          </div>
        </header>
      </div>
      <EditorContent className="mt-8" editor={editor} />
    </>
  )
}

export default Tiptap