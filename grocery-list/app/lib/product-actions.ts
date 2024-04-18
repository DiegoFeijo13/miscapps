'use server';

import { z } from 'zod';
import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import {
    Category,
    Product
} from './definitions';

const redirectToUrl = '/main/products'
const ITEMS_PER_PAGE = 6;

const FormSchema = z.object({
    id: z.string(),
    name: z.string({
        invalid_type_error: 'Informe um nome.',
    }),
    category: z.string({
        invalid_type_error: 'Informe uma categoria.'
    })
});

const CreateList = FormSchema.omit({ id: true });
const UpdateList = FormSchema.omit({ id: true });

export type State = {
    errors?: {
        name?: string[];
        category?: string[];
    };
    message?: string | null;
};

export async function createProduct(prevState: State, formData: FormData) {
    const validatedFields = CreateList.safeParse({
        name: formData.get('name'),
        category: formData.get('category'),
    });

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: 'Campos em branco. Falha ao criar produto.',
        };
    }

    const { name, category } = validatedFields.data;

    try {
        await sql`
            INSERT INTO products (name, category)
            VALUES (${name}, ${category})
        `;
    } catch (error) {        
        return {
            message: 'Erro no Banco de Dados. Falha ao criar produto.',
        }
    }

    revalidatePath(redirectToUrl);
    redirect(redirectToUrl);
}

export async function updateProduct(
    id: string,
    prevState: State,
    formData: FormData) {

    const validatedFields = UpdateList.safeParse({
        name: formData.get('name'),
        category: formData.get('category'),
    });

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: 'Campos em branco. Falha ao atualizar produto.',
        };
    }

    const { name, category } = validatedFields.data;

    try {
        await sql`UPDATE products
            SET name = ${name}, category = ${category}
            WHERE id = ${id}
        `;
    } catch (error) {
        console.log(error)
        return {
            message: 'Erro no Banco de Dados. Falha ao atualizar produto.',
        }
    }

    revalidatePath(redirectToUrl);
    redirect(redirectToUrl);
}

export async function fetchCategories() {
    try {
        const categories = await sql<Category>`SELECT DISTINCT p.category as name from products p ORDER BY 1 DESC`;

        return categories.rows;
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Falha ao carregar produtos.');
    }
}

export async function fetchFilteredProducts(
    query: string,
    category: string,
    currentPage: number,
) {
    const offset = (currentPage - 1) * ITEMS_PER_PAGE;

    try {
        const products = await sql<Product>`
            SELECT
                p.id,
                p.name,
                p.category
            FROM products p      
            WHERE 1=1
                AND p.name ILIKE ${`%${query}%`}
                AND p.category ILIKE ${`${category}`} 
            ORDER BY 
                p.name
            LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}`;

        return products.rows;
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error(`Falha ao carregar produtos. Parametros: query(${query}) category(${category}) currentPage(${currentPage})`);
    }
}

export async function fetchAllProducts() {
    try {
        const products = await sql<Product>`
            SELECT
                p.id,
                p.name,
                p.category
            FROM products p
            ORDER BY 
                p.name`;

        return products.rows;
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error(`Falha ao carregar produtos.`);
    }
}

export async function fetchProductPages(query: string, category: string) {    
    try {
        const count = await sql`SELECT COUNT(*)
      FROM products p      
      WHERE 1=1
        AND p.name ILIKE ${`%${query}%`} 
        AND p.category ILIKE ${`${category}`}`;

        const totalPages = Math.ceil(Number(count.rows[0].count) / ITEMS_PER_PAGE);
        return totalPages;
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Falha ao obter número total de produtos.');
    }
}

export async function fetchProductById(id: string) {
    try {
        const lists = await sql<Product>`
            SELECT id, name, category
            FROM products
            WHERE id = ${id}`;

        revalidatePath(`${redirectToUrl}/${id}/edit`)

        return lists.rows[0];
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error(`Falha ao carregar produto. Parametros: id(${id})`);
    }
}

export async function deleteProduct(id: string) {
    try {
        await sql`DELETE FROM products WHERE id = ${id}`;
        revalidatePath(redirectToUrl);
        return { message: 'Produto excluído.' };
    } catch (error) {
        return { message: 'Database Error: Falha ao excluir produto.', }
    }
}