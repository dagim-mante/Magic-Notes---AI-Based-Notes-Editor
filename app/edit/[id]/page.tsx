import EditTopicForm from '@/components/EditTopicForm'
import db from '@/libs/db'
import { getServerSession } from 'next-auth'

interface EditProps{
  params: object
}

async function getTopic(id, userId){
  try{
    const res = await fetch(`http://localhost:3000/api/topics/${id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({id, userId}),
      cache: 'no-cache'
    })
    if(res.ok){
      const data = await res.json()
      return data
    }else{
      throw new Error('failed to fetch.')
    }
  }catch(error){
    console.log(error)
  }
}

const Edit:React.FC<EditProps> = async ({ params }) => {
  const session = await getServerSession(db)
  const user = await db.user.findUnique({
    where :{
        email: session?.user.email
    }
  })
  const {topic} = await getTopic(params.id, user.id)
  if(!topic){
    return <h2>You don't have access.</h2>
  }
  const {title, description} = topic

  return (
    <>
        <h2 className="text-xl">Edit Topic</h2>
        <EditTopicForm 
            id={params.id}
            title={title}
            description={description}
        />
    </> 
  )
}

export default Edit