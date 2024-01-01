import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import {cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(req) {
    // cookies from next headers and sup uses cookie based auth form next js.
    // main reason is to handle server and client components cuz we can pass these cookies 
    // to our client or the server to check for our authenticated user!
    const cookieStore = cookies();
    const supabase = createRouteHandlerClient({cookies: () => cookieStore});

    const {searchParams} = new URL(req.url);

    const code = searchParams.get('code')
    if (code) {
        await supabase.auth.exchangeCodeForSession(code);
    }

    return NextResponse.redirect(new URL('/watch-list', req.url))
}