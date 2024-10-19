'use client'

import { useEffect } from "react"

export default function ContentUpdater({
    editor,
    content,
    setContent
} : {
    editor: any,
    content: string | null,
    setContent: any
}){
    useEffect(() => {
        setContent(editor.getHTML())
    }, [editor])
    return null
}