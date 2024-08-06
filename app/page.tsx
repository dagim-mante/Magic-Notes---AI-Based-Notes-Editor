import TopicsList from "@/components/TopicsList";
import { getServerSession } from "next-auth";
import db from '@/libs/db'
import UserDashboard from "@/components/UserDashboard";
import Provider from '@/components/Provider'

export default async function Home() {
  const session = await getServerSession(db)
  return (
      <div>
        {session?.user ? (
          <>
            <Provider>
              <UserDashboard />
            </Provider>
            <TopicsList />
          </>
        ) : (
            <>
              <h2>Welcome to Magic Notes!</h2>
            </>
        )}
      </div>
  )
}
