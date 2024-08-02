import EditTopicForm from '@/components/EditTopicForm'

interface EditProps{
  params: object
}

async function getTopic(id){
  try{
    const res = await fetch(`http://localhost:3000/api/topics/${id}`, {
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
  const {topic} = await getTopic(params.id)
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