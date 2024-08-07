import Link from "next/link"
import { HiPencilAlt } from "react-icons/hi"
import RemoveBtn from "./RemoveBtn"
import { getServerSession } from "next-auth"
import db from "@/libs/db"

const getTopics = async (userId) => {
    try{
        const res = await fetch('http://localhost:3000/api/topics/all', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({userId: userId}),
            cache: 'no-cache'
        })
        
        if(!res.ok){
            throw new Error('failed to fetch')
        }
        return res.json()
    }catch(error){
        console.log(error)
    }
}

export default async function TopicsList(){
    const session = await getServerSession(db)
    const user = await db.user.findUnique({
        where :{
            email: session?.user.email
        }
    })
    let body = await getTopics(user?.id)
    const {notes} = body

    return (
        <>
            {notes.length ? notes.map((t, i) => (
                <div key={i} className='px-4 py-8 flex justify-between gap-4 border border-slate-500 my-3 items-start'>
                    <div>
                        <h2 className="text-2xl font-bold">{t.title}</h2>
                        <p>{t.description}</p>
                    </div>
                    <div className="flex gap-2">
                        <RemoveBtn id={t.id} />
                        <Link href={`/edit/${t.id}`}><HiPencilAlt size={24} /></Link>
                    </div>
                </div>
            )) : (
                <h2>No Topics.</h2>
            )}
        </>
    )
}