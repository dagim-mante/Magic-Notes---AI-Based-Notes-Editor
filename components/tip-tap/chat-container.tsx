'use client'
import { useChat } from 'ai/react';
import { ScrollArea } from '../ui/scroll-area';
import { Send } from 'lucide-react';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { useEffect, useRef } from 'react'

export default function Chat(){
    const { messages, input, handleInputChange, handleSubmit } = useChat({
        id: "desktop"
    });
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if(messages){
            ref.current?.scrollIntoView({
                behavior: 'smooth',
                block: 'end'
            })
        }
    }, [messages])

    return (
        <>
            <header className="p-4 border-b">
                <h1 className="text-xl font-bold">✨Magic AI</h1>
            </header>

            <ScrollArea className="flex-grow p-4">
                <div className="space-y-4">
                    {messages.map(message => (
                        <div
                            className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`} 
                            key={message.id}
                        > 
                            <div
                                className={`max-w-[70%] rounded-lg p-3 ${
                                message.role === "user"
                                    ? "bg-primary text-primary-foreground"
                                    : "bg-secondary text-secondary-foreground"
                                }`}
                            >
                                {message.content}
                            </div>              
                        </div>
                    ))}
                    <div ref={ref} />
                </div>
            </ScrollArea>

            <div className="p-4 border-t">
                <form 
                    onSubmit={handleSubmit}
                    className="flex space-x-2"
                >
                    <Input 
                        name="prompt"
                        value={input}
                        onChange={handleInputChange} 
                        placeholder="Type your message..."
                        autoComplete="off"
                    />
                    <Button type="submit">
                        <Send className="w-4 h-4" />
                        <span className="sr-only">Send</span>
                    </Button>
                </form>
            </div>

        </>
    )
}