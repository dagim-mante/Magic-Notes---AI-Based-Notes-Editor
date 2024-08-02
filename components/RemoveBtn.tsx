'use client'
import { useRouter } from "next/navigation"
import { HiOutlineTrash } from "react-icons/hi"

interface RemoveBtnProps{
  _id: string
}

const RemoveBtn:React.FC<RemoveBtnProps> = ({_id}) => {

  const router = useRouter()

  const removeTopic = async () => {
    const confirmed = confirm('Are you sure?')
    if(confirmed){
      await fetch(`http://localhost:3000/api/topics?id=${_id}`, {
        method: 'DELETE'
      })
      router.refresh()
    }
  }
  return (
    <button onClick={removeTopic} className="text-red-400">
      <HiOutlineTrash size={24}/>
    </button>
  )
}

export default RemoveBtn