'use server';

import { z } from 'zod';
import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { List } from './definitions';

const redirectToUrl = '/main/lists'
const ITEMS_PER_PAGE = 6;

const FormSchema = z.object({
    id: z.string(),
    name: z.string({
        invalid_type_error: 'Informe um nome.',
    }),
    date: z.string({
        invalid_type_error: 'Informe uma data.'
    })
});

const CreateList = FormSchema.omit({ id: true });
const UpdateList = FormSchema.omit({ id: true });

export type State = {
    errors?: {
        name?: string[];
        date?: string[];
    };
    message?: string | null;
};

export async function createList(prevState: State, formData: FormData) {
    const validatedFields = CreateList.safeParse({
        name: formData.get('name'),
        date: formData.get('date'),
    });

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: 'Campos em branco. Falha ao criar lista.',
        };
    }

    const { name, date } = validatedFields.data;

    try {
        await sql`
            INSERT INTO lists (name, buy_dt)
            VALUES (${name}, ${date})
        `;
    } catch (error) {
        return {
            message: 'Erro no Banco de Dados. Falha ao criar lista.',
        }
    }

    revalidatePath(redirectToUrl);
    redirect(redirectToUrl);
}

export async function updateList(
    id: string,
    prevState: State,
    formData: FormData) {

    const validatedFields = UpdateList.safeParse({
        name: formData.get('name'),
        date: formData.get('date'),
    });

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: 'Campos em branco. Falha ao atualizar lista.',
        };
    }

    const { name, date } = validatedFields.data;

    try {
        await sql`UPDATE lists
            SET name = ${name}, buy_dt = ${date}
            WHERE id = ${id}
        `;
    } catch (error) {
        console.log(error)
        return {
            message: 'Erro no Banco de Dados. Falha ao atualizar lista.',
        }
    }

    revalidatePath(redirectToUrl);
    redirect(redirectToUrl);
}

export async function fetchFilteredLists(
    query: string,
    currentPage: number,
) {
    const offset = (currentPage - 1) * ITEMS_PER_PAGE;

    try {
        const lists = await sql<List>`
            SELECT id, name, buy_dt 
            FROM lists 
            WHERE name ILIKE ${`%${query}%`} 
                OR buy_dt::text ILIKE ${`%${query}%`}
            ORDER BY buy_dt DESC LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
            `;

        return lists.rows;
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error(`Falha ao carregar listas. Parametros: query(${query}) currentPage(${currentPage})`);
    }
}

export async function fetchListPages(query: string) {
    try {
        const count = await sql`SELECT COUNT(*)
      FROM lists l      
      WHERE l.name ILIKE ${`%${query}%`} 
        OR l.buy_dt::text ILIKE ${`%${query}%`}`;

        const totalPages = Math.ceil(Number(count.rows[0].count) / ITEMS_PER_PAGE);
        return totalPages;
    } catch (error) {
        console.error('Erro no Banco de Dados:', error);
        throw new Error('Falha ao obter número total de listas.');
    }
}

export async function fetchListById(id: string) {
    try {
        const lists = await sql<List>`
            SELECT
                l.id,
                l.name,
                l.buy_dt
            FROM lists l      
            WHERE l.id = ${id}`;

        revalidatePath(`${redirectToUrl}/${id}/edit`)

        return lists.rows[0];
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error(`Falha ao carregar lista. Parametros: id(${id})`);
    }
}

export async function deleteList(id: string) {
    try {
        await sql`DELETE FROM lists WHERE id = ${id}`;
        revalidatePath(redirectToUrl);
        return { message: 'Lista excluída.' };
    } catch (error) {
        return { message: 'Database Error: Falha ao excluir lista.', }
    }
}

