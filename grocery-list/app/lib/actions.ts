'use server';

import { signIn } from '@/auth';
import { AuthError } from 'next-auth';
import { redirect } from 'next/navigation';
import { auth } from '@/auth';

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
                    return 'Credenciais Inválidas.';
                default:
                    return 'Algo deu errado.';
            }
        }
        throw error;
    }
}

export async function getSessionUser() {
    const session = await auth();
    return session?.user
}
    

export async function gotoProductList(listId: string){
    redirect(`/main/lists/${listId}/product-list`)
}

export async function gotoProductListEdit(listId: string, productListId: string){
    redirect(`/main/lists/${listId}/product-list/${productListId}/edit`)
}