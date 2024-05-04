'use server';

import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { NewProductList, ProductListUpdate } from './db_schema';
import {
    createProductList,
    updateProductList,
    deleteProductList,
    findProductListById,
    findProductByName,
    createProduct,
    fetchProductListById,
    findProductNotInList,
    createBunchProductList
} from './database'
import { fetchListById } from './list-actions';
import { fetchProductById } from './product-actions';

const REDIRECT_TO_URL = (listId: string) => (`/main/lists/${listId}/product-list`)

const FormSchema = z.object({
    id: z.string(),
    product_id: z.string(),
    product_name: z.string(),
    list_id: z.string(),
    quantity: z.coerce
        .number()
        .gt(0, { message: 'Informe uma quantidade maior que zero.' }),
    price: z.coerce
        .number()
        .gt(0, { message: 'Informe um preço maior que zero.' })
});

const Add = FormSchema.omit({ id: true, product_id: true, quantity: true, price: true, list_id: true });
const Update = FormSchema.omit({ id: true, product_id: true, product_name: true });

export type State = {
    errors?: {
        product_id?: string[];
        product_name?: string[];
        list_id?: string[];
        quantity?: string[];
        price?: string[];
    };
    message?: string | null;
};

export async function create(listId: string, category: string, prevState: State, formData: FormData) {
    const validatedFields = Add.safeParse({
        product_name: formData.get('product_name'),
    });

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: 'Campos em branco. Falha ao adicionar produto à lista.',
        };
    }

    //Needs to create product?
    const { product_name } = validatedFields.data;
    let product = await findProductByName(product_name);

    if (!product) {
        let newProduct = {
            name: product_name,
            category: category
        }
        try {
            product = await createProduct(newProduct)
        } catch (error) {
            return {
                errors: {product_name: ["Erro ao criar produto"]},
                message: 'Erro no Banco de Dados. Falha ao criar produto.',
            }
        }
    }

    let productList = {
        product_id: product.id,
        list_id: listId,
        quantity: 0,
        price: 0,
        done: false
    }

    try {
        createProductList(productList)
    } catch (error) {
        return {
            message: 'Erro no Banco de Dados. Falha ao comprar produto.',
        }
    }

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

    let path = REDIRECT_TO_URL(productList.list_id ?? '')

    revalidatePath(path);
    redirect(path);
}

export async function toggleDone(id: string, done: boolean) {
    const productList = await fetchProductListById(id);

    if (!productList)
        return;

    productList.done = done;

    try {
        updateProductList(id, productList)
    } catch (error) {
        console.log(error)
        return {
            message: 'Erro no Banco de Dados. Falha ao atualizar dados da compra.',
        }
    }

    revalidatePath(REDIRECT_TO_URL(productList.list_id))
    redirect(REDIRECT_TO_URL(productList.list_id))
}

export async function addAllProductsToList(listId: string, products: string[]) {
    const list = await fetchListById(listId)    

    if (!list || products.length <= 0)
        return {
            message: "Não foi possível adicionar o produto à lista. Entidades não encontradas na base de dados."
        }

    try {
        createBunchProductList(listId, products)
    } catch (error) {        
        console.log(products)        
        return {
            message: 'Erro no Banco de Dados. Falha ao adicionar produto à lista.',
        }
    }

    let path = `${REDIRECT_TO_URL(listId)}/add`

    revalidatePath(path)
    redirect(path)
}

export async function remove(id: string) {
    const productList = await fetchById(id);

    deleteProductList(id);

    revalidatePath(REDIRECT_TO_URL(productList.list_id))
    redirect(REDIRECT_TO_URL(productList.list_id))
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
                category: ''
            }

        if (result.list_id && result.list_id.trim().length > 0)
            revalidatePath(REDIRECT_TO_URL(result.list_id))

        return result
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error(`Falha ao carregar produto comprado. Parametros: id(${id})`);
    }
}

export async function fetchProductsNotInList(listId: string) {
    return await findProductNotInList(listId)
}
