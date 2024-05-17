import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { authConfig } from './auth.config';
import { z } from 'zod';
import { sql } from '@vercel/postgres';
import type { User } from '@/app/lib/definitions';
import bcrypt from 'bcrypt';


async function getUser(name: string): Promise<User | undefined> {
    try {
        const user = await sql<User>`SELECT * FROM users WHERE name=${name}`;        
        return user.rows[0];
    } catch (error) {        
        throw new Error('Falha ao carregar usuário.');
    }
}

export const { handlers, auth, signIn, signOut } = NextAuth({
    ...authConfig,
    providers: [
        Credentials({
            async authorize(credentials) {
                const parsedCredentials = z
                    .object({ name: z.string(), password: z.string().min(6) })
                    .safeParse(credentials);

                if (parsedCredentials.success) {
                    const { name, password } = parsedCredentials.data;
                    const user = await getUser(name);
                    if (!user) 
                        return null;

                    const passwordsMatch = await bcrypt.compare(password, user.password);

                    if (passwordsMatch) return user;
                }
                return null;
            },
        }),
    ],
    callbacks: {
        session: async ({ session, token }) => {
          if (session?.user) {
            session.user.id = token.sub ?? '';
          }
          return session;
        },
        jwt: async ({ user, token }) => {
          if (user) {
            token.uid = user.id;
          }
          return token;
        },
      },
      session: {
        strategy: 'jwt',
      },
});