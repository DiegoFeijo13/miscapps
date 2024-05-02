'use server';

import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import {
    createProduct,
    findAllCategories,
    findAllProducts,
    findProductById,
    updateProduct,
    deleteProduct,
    findProductByName
} from './database'
import { NewProduct, ProductUpdate } from './db_schema';

const REDIRECT_TO_URL = '/main/products'

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

export async function create(prevState: State, formData: FormData) {
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

    const newProduct: NewProduct = validatedFields.data;

    try {
        await createProduct(newProduct)
    } catch (error) {
        return {
            message: 'Erro no Banco de Dados. Falha ao criar produto.',
        }
    }

    revalidatePath(REDIRECT_TO_URL);
    redirect(REDIRECT_TO_URL);
}

export async function update(
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

    const product: ProductUpdate = validatedFields.data;

    try {
        await updateProduct(id, product)
    } catch (error) {
        return {
            message: 'Erro no Banco de Dados. Falha ao atualizar produto.',
        }
    }

    revalidatePath(REDIRECT_TO_URL);
    redirect(REDIRECT_TO_URL);
}

export async function fetchCategories() { return await findAllCategories() }

export async function fetchProducts() { return await findAllProducts() }

export async function fetchProductById(id: string) {
    return await findProductById(id) ?? { id: '', name: '', category: '' }
}

export async function fetchProductByName(name: string) {
    return await findProductByName(name);
}

export async function remove(id: string) {
    await deleteProduct(id);

    revalidatePath(REDIRECT_TO_URL)
    redirect(REDIRECT_TO_URL)
}