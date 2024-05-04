'use server';

import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { NewList, ListUpdate } from './db_schema';
import {
    createList,
    findAllLists,
    findListById,
    updateList,
    deleteList,
    fetchBoughtProductsByList
} from './database'

const REDIRECT_TO_URL = '/main/lists'

const FormSchema = z.object({
    id: z.string(),
    name: z.string({invalid_type_error: 'Informe um nome.'})
        .min(1,"Um nome deve ser informado")    ,
    date: z.string({
        invalid_type_error: 'Informe uma data.'
    })
});

const AddList = FormSchema.omit({ id: true });
const UpdateList = FormSchema.omit({ id: true });

export type State = {
    errors?: {
        name?: string[];
        date?: string[];
    };
    message?: string | null;
};

export async function create(prevState: State, formData: FormData) {
    const validatedFields = AddList.safeParse({
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

    let list: NewList = {
        name: name,
        buy_dt: new Date(date)
    }

    try {
        await createList(list)

    } catch (error) {
        return {
            message: 'Erro no Banco de Dados. Falha ao criar lista.',
        }
    }

    revalidatePath(REDIRECT_TO_URL);
    redirect(REDIRECT_TO_URL);
}

export async function edit(
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

    let newValues: ListUpdate = {
        name: name,
        buy_dt: new Date(date)
    }

    try {
        updateList(id, newValues)
    } catch (error) {        
        return {
            message: 'Erro no Banco de Dados. Falha ao atualizar lista.',
        }
    }

    revalidatePath(REDIRECT_TO_URL);
    redirect(REDIRECT_TO_URL);
}

export async function fetchLists() { return findAllLists() }

export async function fetchListById(id: string) {
    try {
        let result = await findListById(id)

        revalidatePath(`${REDIRECT_TO_URL}/${id}/edit`)

        return result ?? { id: '', name: '', buy_dt: '' };
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error(`Falha ao carregar lista. Parametros: id(${id})`);
    }
}

export async function remove(id: string) {
    await deleteList(id);

    revalidatePath(REDIRECT_TO_URL)
    redirect(REDIRECT_TO_URL)
}

export async function getBoughtProducts(listId: string) {
    return fetchBoughtProductsByList(listId);
}

