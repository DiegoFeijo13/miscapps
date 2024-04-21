'use server';

import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { NewProductList, ProductListUpdate } from './db_schema';
import {
    createProductList,
    updateProductList,
    deleteProductList,
    findProductListById
} from './database'

const REDIRECT_TO_URL = (listId: string) => (`/main/lists/${listId}/product-list`)

const FormSchema = z.object({
    id: z.string(),
    product_id: z.string(),
    list_id: z.string(),
    quantity: z.coerce
        .number()
        .gt(0, { message: 'Informe uma quantidade maior que zero.' }),
    price: z.coerce
        .number()
        .gt(0, { message: 'Informe um preço maior que zero.' })
});

const Add = FormSchema.omit({ id: true });
const Update = FormSchema.omit({ id: true, product_id: true });

export type State = {
    errors?: {
        product_id?: string[];
        list_id?: string[];
        quantity?: string[];
        price?: string[];
    };
    message?: string | null;
};

export async function create(prevState: State, formData: FormData) {
    const validatedFields = Add.safeParse({
        product_id: formData.get('product_id'),
        list_id: formData.get('list_id'),
        quantity: formData.get('quantity'),
        price: formData.get('price'),
    });

    if (!validatedFields.success) {        
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: 'Campos em branco. Falha ao comprar produto.',
        };
    }

    const productList: NewProductList = validatedFields.data;

    try {
        createProductList(productList)
    } catch (error) {
        return {
            message: 'Erro no Banco de Dados. Falha ao comprar produto.',
        }
    }

    console.log(REDIRECT_TO_URL(productList.list_id))

    revalidatePath(REDIRECT_TO_URL(productList.list_id));
    redirect(REDIRECT_TO_URL(productList.list_id));
}

export async function edit(
    id: string,
    prevState: State,
    formData: FormData) {

    const validatedFields = Update.safeParse({        
        list_id: formData.get('list_id'),
        quantity: formData.get('quantity'),
        price: formData.get('price'),
    });

    if (!validatedFields.success) {
        console.log(validatedFields.error.flatten().fieldErrors)
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: 'Campos em branco. Falha ao atualizar dados da compra.',
        };
    }

    const productList: ProductListUpdate = validatedFields.data;

    try {
        updateProductList(id, productList)
    } catch (error) {
        console.log(error)
        return {
            message: 'Erro no Banco de Dados. Falha ao atualizar dados da compra.',
        }
    }

    revalidatePath(REDIRECT_TO_URL(productList.list_id ?? ''));
    redirect(REDIRECT_TO_URL(productList.list_id ?? ''));
}

export async function remove(id: string) {
    deleteProductList(id);

    //TODO: retornar pra qual URL?    
    revalidatePath(REDIRECT_TO_URL(id))
    redirect(REDIRECT_TO_URL(id))
}

export async function fetchById(id: string) {
    try {
        let result =
            await findProductListById(id) ??
            {
                id: '', 
                product_name: '', 
                list_id: '', 
                list_name: '',
                price: 0, 
                quantity: 0,                
            }

        if (result.list_id && result.list_id.trim().length > 0)
            revalidatePath(REDIRECT_TO_URL(result.list_id))

        return result
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error(`Falha ao carregar produto comprado. Parametros: id(${id})`);
    }
}
