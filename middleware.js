import {createMiddlewareClient} from '@supabase/auth-helpers-nextjs';
import {NextResponse} from 'next/server'

export async function middleware(req) {
    const res = NextResponse.next();
    const supabase = createMiddlewareClient({req, res});

    const {data: {user}} = await supabase.auth.getUser();
    
    if (user && req.nextUrl.pathname === '/'){
        return NextResponse.redirect(new URL('/watch-list', req.url))
    }

    // if they don't have a logged in user and 
    // they are trying to access a pathname that isn't our login page
    // redirect them back to our login page.
    if (!user && req.nextUrl.pathname !== '/'){
        return NextResponse.redirect(new URL('/', req.url))
    }

    return res;
}

export const config = {
    matcher: ['/', '/watch-list']
}