import LoginComponent from "@/components/auth/login-page";
import { auth } from "@/server/auth";

export default async function LoginPage(){
    const session = await auth()
    return (
        <div>
            {
                session ? (
                    <>
                        {JSON.stringify(session)}
                    </>
                ) : (
                    <LoginComponent />
                )
            }
            
        </div>
    )
}