import { NextRequest, NextResponse } from "next/server";
import { auth } from "./server/auth";
import { NextURL } from "next/dist/server/web/next-url";


export async function middleware(req: NextRequest){
    const session = await auth()
    const {origin, pathname} = req.nextUrl
    if(!session){
        console.log("pathname", pathname)
        if(pathname === '/' || pathname === '/login'){
            return NextResponse.next()
        }else{
            const loginPage = new NextURL("/login", origin);
            return NextResponse.redirect(loginPage)
        }
    }else{
        if(pathname === '/login'){
            const notesPage = new NextURL("/notes", origin);
            return NextResponse.redirect(notesPage)
        }else{  
            return NextResponse.next()
        }
    }
}

export const config = {
    matcher: [
        '/',
        '/login',
        '/notes/:id*',
        '/notes'
    ],
  }
