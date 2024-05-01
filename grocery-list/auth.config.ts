import type { NextAuthConfig } from 'next-auth';

export const authConfig = {
    pages: {
        signIn: '/login',
    },
    callbacks: {
        authorized({ auth, request: { nextUrl } }) {
            const isLoggedIn = !!auth?.user;
            const isOnMain = nextUrl.pathname.startsWith('/main');
            if (isOnMain) {
                return isLoggedIn;
            } else if (isLoggedIn) {
                return Response.redirect(new URL('/main/lists', nextUrl));
            }            
            return isLoggedIn;
        },
    },
    providers: [], 
} satisfies NextAuthConfig;

