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
    deleteList
} from './database'

const REDIRECT_TO_URL = '/main/lists'
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
        createList(list)
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
        console.log(error)
        return {
            message: 'Erro no Banco de Dados. Falha ao atualizar lista.',
        }
    }

    revalidatePath(REDIRECT_TO_URL);
    redirect(REDIRECT_TO_URL);
}

export async function fetchFilteredLists(
    query: string,
    currentPage: number,
) {
    const offset = (currentPage - 1) * ITEMS_PER_PAGE;

    return findAllLists(query, ITEMS_PER_PAGE, offset);
}

export async function fetchListPages(query: string) {
    return (await findAllLists(query, null, null)).length;

}

export async function fetchListById(id: string) {

    let result = findListById(id)

    revalidatePath(`${REDIRECT_TO_URL}/${id}/edit`)

    return result;
}

export async function remove(id: string) {    
    deleteList(id);

    revalidatePath(REDIRECT_TO_URL)
    redirect(REDIRECT_TO_URL)
}

