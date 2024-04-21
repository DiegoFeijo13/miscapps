import {
    Database,
    ListUpdate,
    NewList,
    NewProduct,
    NewProductList,
    ProductListUpdate,
    ProductUpdate
} from '@/app/lib/db_schema'
import { createKysely } from '@vercel/postgres-kysely'
import { sql } from '@vercel/postgres'
import { ProductListVM } from './definitions';

const db = createKysely<Database>();

//#region List Functions
export async function createList(list: NewList) {
    return await db.insertInto('lists')
        .values(list)
        .returningAll()
        .executeTakeFirstOrThrow()
}

export async function updateList(id: string, newValues: ListUpdate) {
    await db.updateTable('lists')
        .set(newValues)
        .where('id', '=', id)
        .execute()
}

export async function deleteList(id: string) {    
    return await db.deleteFrom('lists')
        .where('id', '=', id)
        .returningAll()
        .executeTakeFirst()
}

export async function findListById(id: string) {
    return await db.selectFrom('lists')
        .where('id', '=', id)
        .selectAll()
        .executeTakeFirst()

}

export async function findAllLists() {
    let query = db.selectFrom('lists')

    return await query.orderBy('buy_dt', 'desc')
        .selectAll()
        .execute()
}

export async function fetchProductsToBuyByList(listId: string) {
    try {
        const products = await sql<ProductListVM>`
            SELECT 
                p.name, 
                p.category,
                p.id as product_id,
                pl.id as productList_id,
                pl.quantity,
                pl.price,
                ${listId} as list_id
            FROM products p 
            LEFT JOIN productlist pl ON pl.product_id = p.id 
                AND pl.list_id = ${listId}
            WHERE pl.id IS NULL
            ORDER BY p.name`;

        return products.rows;
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error(`Falha ao carregar produtos.`);
    }
}

export async function fetchBoughtProductsByList(listId: string) {
    return await
        db.selectFrom('productlist')
            .innerJoin('products', 'productlist.product_id', 'products.id')
            .innerJoin('lists','lists.id', 'productlist.list_id')
            .where('productlist.list_id', '=', listId)
            .orderBy('products.name')
            .select([
                'productlist.id',
                'productlist.quantity',
                'productlist.price',
                'products.name as product_name',
                'lists.name as list_name',
                'lists.id as list_id'
            ])
            .execute()
}
//#endregion List Functions

//#region Product Functions
export async function createProduct(product: NewProduct) {
    return await db.insertInto('products')
        .values(product)
        .returningAll()
        .executeTakeFirstOrThrow()
}

export async function updateProduct(id: string, newValues: ProductUpdate) {
    await db.updateTable('products')
        .set(newValues)
        .where('id', '=', id)
        .execute()
}

export async function deleteProduct(id: string) {
    return await db.deleteFrom('products')
        .where('id', '=', id)
        .returningAll()
        .executeTakeFirst()
}

export async function findProductById(id: string) {
    return await db.selectFrom('products')
        .where('id', '=', id)
        .selectAll()
        .executeTakeFirst()
}

export async function findAllProducts(criteria: string, limit: number | null, offSet: number | null) {
    let query = db.selectFrom('products')

    if (limit)
        query.limit(limit)

    if (offSet)
        query.offset(offSet)

    if (criteria && criteria.trim().length > 0) {
        query = query.where((eb) => eb.or([
            eb('name', 'ilike', criteria),
            eb('category', 'ilike', criteria)
        ]))
            .orderBy('name')
    }

    return await query.selectAll().execute()
}
//#endregion Product Functions

//#region ProductList Functions
export async function createProductList(productList: NewProductList) {
    return await db.insertInto('productlist')
        .values(productList)
        .returningAll()
        .executeTakeFirstOrThrow()
}

export async function updateProductList(id: string, newValues: ProductListUpdate) {
    await db.updateTable('productlist')
        .set(newValues)
        .where('id', '=', id)
        .execute()
}

export async function deleteProductList(id: string) {
    return await db.deleteFrom('productlist')
        .where('id', '=', id)
        .returningAll()
        .executeTakeFirst()
}

export async function findProductListById(id: string) {
    return await db.selectFrom('productlist')
    .innerJoin('products', 'productlist.product_id', 'products.id')    
    .innerJoin('lists', 'productlist.list_id', 'lists.id')
        .where('productlist.id', '=', id)
        .select([
            'productlist.id',
            'productlist.quantity',
            'productlist.price',
            'products.name as product_name',
            'lists.name as list_name',
            'lists.id as list_id'
        ])
        .executeTakeFirst()

}
//#endregion ProductList Functions