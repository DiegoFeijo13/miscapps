'use server';

import { z } from 'zod';
import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

const redirectToUrl = 'main/lists'

const FormSchema = z.object({
    id: z.string(),
    name: z.string({
        invalid_type_error: 'Informe um nome.',
    }),
    date: z.string({
        invalid_type_error: 'Informe uma data.'
    })    
});

const CreateList = FormSchema.omit({ id: true});
const UpdateList = FormSchema.omit({ id: true});

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
            INSERT INTO lists (name, date)
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
            SET name = ${name}, date = ${date}
            WHERE id = ${id}
        `;
    } catch (error) {
        return {
            message: 'Erro no Banco de Dados. Falha ao atualizar lista.',
        }
    }

    revalidatePath(redirectToUrl);
    redirect(redirectToUrl);
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