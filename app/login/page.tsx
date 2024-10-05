import LoginComponent from "@/components/auth/login-page";
import { auth } from "@/server/auth";

export default async function LoginPage(){
    const session = await auth()
    return (
        <div>
            {
                session ? (
                    <div className="overflow-hidden">
                        {JSON.stringify(session)}
                    </div>
                ) : (
                    <LoginComponent />
                )
            }
            
        </div>
    )
}