'use server';

import { z } from 'zod';
import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import {
    List,
    ProductList
} from './definitions';

import { fetchListById } from "@/app/lib/list-actions";
import { fetchProductById } from "@/app/lib/product-actions";

const TABLE_NAME = 'productList';
const REDIRECT_TO_URL = '/main/product-list';
const ITEMS_PER_PAGE = 6;

const FormSchema = z.object({
    id: z.string(),
    productId: z.string(),    
    quantity: z.number(),
    price: z.number(),
    bought: z.boolean()
});


const UpdateList = FormSchema.omit({ id: true });

export async function addProduct(listId: string, productId: string) {
    
    try {
        await sql`INSERT INTO ${TABLE_NAME} (product_id, list_id) 
        VALUES (${productId}, ${listId})`;
    } catch (error) {
        console.log(error);
        console.log(`INSERT INTO ${TABLE_NAME} (product_id, list_id, bought) 
        VALUES ('${productId}', '${listId}')`)

        return {
            message: 'Erro no banco de dados: Falha ao adicionar produto à lista.',
        }
    }

    revalidatePath(REDIRECT_TO_URL);
    redirect(REDIRECT_TO_URL);
}

export async function deleteProduct(id: string) {
    try {
        await sql`DELETE FROM ${TABLE_NAME} WHERE id = ${id}`;
        revalidatePath(REDIRECT_TO_URL);
        return { message: 'Produto excluído da lista.' };
    } catch (error) {
        return { message: 'Database Error: Falha ao excluir produto da lista.', }
    }
}

