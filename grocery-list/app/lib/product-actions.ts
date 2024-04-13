'use server';

import { z } from 'zod';
import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

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