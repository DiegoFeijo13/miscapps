'use server';

import { z } from 'zod';
import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { signIn } from '@/auth';
import { AuthError } from 'next-auth';

export async function authenticate(
    prevState: string | undefined,
    formData: FormData,
) {
    try {
        await signIn('credentials', formData);
    } catch (error) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case 'CredentialsSignin':
                    return 'Invalid credentials.';
                default:
                    return 'Something went wrong.';
            }
        }
        throw error;
    }
}

export async function deleteProduct(id: string) {
    throw new Error('Falha ao excluir produto');

    try {
        await sql`DELETE FROM products WHERE id = ${id}`;
        revalidatePath('/main/products');
        return { message: 'Produto excluído.' };
    } catch (error) {
        return { message: 'Database Error: Falha ao excluir produto.', }
    }

}