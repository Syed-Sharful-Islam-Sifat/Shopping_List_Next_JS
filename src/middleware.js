import { NextResponse } from "next/server";
import { withAuth } from "next-auth/middleware";
import { getToken } from "next-auth/jwt";


export default withAuth(

    async function middleware(req){
       
        const token = await getToken({req});

        const isPublicPath = req.nextUrl.pathname === '/login' || req.nextUrl.pathname === '/register';

        if(isPublicPath&&token){
           return NextResponse.redirect(new URL('/',req.url));
        }

        if(!isPublicPath&&!token){
            return NextResponse.redirect(new URL('/login',req.url));
        }
    },
 
    {
        callbacks:{
            authorized({req,token}){
                return true
            }
        },
    }
 );
export const config = {
  matcher: [ "/login", "/register","/additem"],
};
