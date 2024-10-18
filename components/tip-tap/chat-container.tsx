'use client'
import { useChat } from 'ai/react';
import { ScrollArea } from '../ui/scroll-area';
import { CircleStop, Send } from 'lucide-react';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { useEffect, useRef } from 'react'

export default function Chat(){
    const { messages, input, handleInputChange, handleSubmit, isLoading, stop } = useChat({
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
                    {messages.length > 0 ? (
                        <>
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
                        </>
                    ) : (
                        <div className="flex flex-col items-center justify-center h-full text-center">
                            <svg className="w-48 h-48 mb-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="0000"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fillRule="evenodd" clipRule="evenodd" d="M14 2C14 2.74028 13.5978 3.38663 13 3.73244V4H20C21.6569 4 23 5.34315 23 7V19C23 20.6569 21.6569 22 20 22H4C2.34315 22 1 20.6569 1 19V7C1 5.34315 2.34315 4 4 4H11V3.73244C10.4022 3.38663 10 2.74028 10 2C10 0.895431 10.8954 0 12 0C13.1046 0 14 0.895431 14 2ZM4 6H11H13H20C20.5523 6 21 6.44772 21 7V19C21 19.5523 20.5523 20 20 20H4C3.44772 20 3 19.5523 3 19V7C3 6.44772 3.44772 6 4 6ZM15 11.5C15 10.6716 15.6716 10 16.5 10C17.3284 10 18 10.6716 18 11.5C18 12.3284 17.3284 13 16.5 13C15.6716 13 15 12.3284 15 11.5ZM16.5 8C14.567 8 13 9.567 13 11.5C13 13.433 14.567 15 16.5 15C18.433 15 20 13.433 20 11.5C20 9.567 18.433 8 16.5 8ZM7.5 10C6.67157 10 6 10.6716 6 11.5C6 12.3284 6.67157 13 7.5 13C8.32843 13 9 12.3284 9 11.5C9 10.6716 8.32843 10 7.5 10ZM4 11.5C4 9.567 5.567 8 7.5 8C9.433 8 11 9.567 11 11.5C11 13.433 9.433 15 7.5 15C5.567 15 4 13.433 4 11.5ZM10.8944 16.5528C10.6474 16.0588 10.0468 15.8586 9.55279 16.1056C9.05881 16.3526 8.85858 16.9532 9.10557 17.4472C9.68052 18.5971 10.9822 19 12 19C13.0178 19 14.3195 18.5971 14.8944 17.4472C15.1414 16.9532 14.9412 16.3526 14.4472 16.1056C13.9532 15.8586 13.3526 16.0588 13.1056 16.5528C13.0139 16.7362 12.6488 17 12 17C11.3512 17 10.9861 16.7362 10.8944 16.5528Z" fill="#3b82f6"></path> </g></svg>
                            <p className="text-xl font-semibold text-gray-500">Start chatting with Magic AI</p>
                            <p className="text-sm text-gray-400">Ask anything, get intelligent responses!</p>
                        </div>
                    )}
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
                    {isLoading ? (
                        <Button onClick={() => stop()} >
                            <CircleStop className="w-4 h-4" />
                            <span className="sr-only">Stop</span>
                        </Button>
                    ) : (
                        <Button type="submit">
                            <Send className="w-4 h-4" />
                            <span className="sr-only">Send</span>
                        </Button>
                    )}
                </form>
            </div>

        </>
    )
}