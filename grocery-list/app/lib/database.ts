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
import { sql } from 'kysely'
import { ListVM } from './definitions';
import { auth } from '@/auth'

const db = createKysely<Database>();


export async function getUserId() {
    const session = await auth();

    if (!session?.user?.id)
        throw new Error("Usuário não encontrado.")

    return session.user.id
}

//#region List Functions
export async function createList(list: NewList) {
    return await db.insertInto('lists')
        .values(list)
        .returningAll()
        .executeTakeFirstOrThrow()
}

export async function updateList(id: string, newValues: ListUpdate) {
    let userId = await getUserId();
    await db.updateTable('lists')
        .set(newValues)
        .where('id', '=', id)
        .where('user_id', '=', userId)
        .execute()
}

export async function deleteList(id: string) {
    let userId = await getUserId();
    return await db.deleteFrom('lists')
        .where('id', '=', id)
        .where('user_id', '=', userId)
        .returningAll()
        .executeTakeFirst()
}

export async function findListById(id: string) {
    let userId = await getUserId();
    return await db.selectFrom('lists')
        .where('id', '=', id)
        .where('user_id', '=', userId)
        .selectAll()
        .executeTakeFirst()

}

export async function findAllLists() {
    let userId = await getUserId();
    let query = db.selectFrom('lists')
        .where('user_id', '=', userId)
        .orderBy('buy_dt', 'desc')
        .selectAll()

    return await query.execute()
}

export async function fetchBoughtProductsByList(listId: string) {
    let userId = await getUserId();
    return await
        db.selectFrom('productlist')
            .innerJoin('products', 'productlist.product_id', 'products.id')
            .innerJoin('lists', 'lists.id', 'productlist.list_id')
            .where('productlist.list_id', '=', listId)
            .where('productlist.user_id', '=', userId)
            .orderBy(['products.category', 'products.name'])
            .select([
                'productlist.id as productList_id',
                'productlist.quantity',
                'productlist.price',
                'productlist.done',
                'products.name as product_name',
                'products.category',
                'products.id as product_id',
                'lists.id as list_id'
            ])
            .execute()
}

export async function fetchListsWithTotals() {
    let userId = await getUserId();

    return await sql<ListVM>
        `select 
                                l.id, 
                                l."name" , 
                                l.buy_dt, 
                                count(pl.id)as items,
                                sum(pl.quantity * pl.price) as total
                            from lists l 
                            left join productlist pl on pl.list_id  = l.id 
                            where l.user_id = ${userId}
                            group by l.id `
        .execute(db)

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
    let userId = await getUserId();

    await db.updateTable('products')
        .set(newValues)
        .where('id', '=', id)
        .where('user_id', '=', userId)
        .execute()
}

export async function deleteProduct(id: string) {
    let userId = await getUserId();

    return await db.deleteFrom('products')
        .where('id', '=', id)
        .where('user_id', '=', userId)
        .returningAll()
        .executeTakeFirst()
}

export async function findProductById(id: string) {
    let userId = await getUserId();

    return await db.selectFrom('products')
        .where('id', '=', id)
        .where('user_id', '=', userId)
        .selectAll()
        .executeTakeFirst()
}

export async function findProductByName(name: string) {
    let userId = await getUserId();

    return await db.selectFrom('products')
        .where('name', 'ilike', name.trim())
        .where('user_id', '=', userId)
        .selectAll()
        .executeTakeFirst()
}

export async function findProductsByCategory(name: string) {
    let userId = await getUserId();

    return await db.selectFrom('products')
        .where('category', 'ilike', name.trim())
        .where('user_id', '=', userId)
        .selectAll()
        .execute()
}

export async function findAllProducts() {
    let userId = await getUserId();

    return await db.selectFrom('products')
        .where('user_id', '=', userId)
        .orderBy('name')
        .selectAll()
        .execute()
}

export async function findAllCategories() {
    let userId = await getUserId();

    return await db.selectFrom('products')
        .select('category')
        .where('user_id', '=', userId)
        .orderBy('category')
        .distinct()
        .execute()
}
//#endregion Product Functions

//#region ProductList Functions
export async function createProductList(productList: NewProductList) {
    return await db.insertInto('productlist')
        .values(productList)
        .returningAll()
        .executeTakeFirstOrThrow()
}

export async function createBunchProductList(listId: string, products: string[]) {
    let userId = await getUserId();
    return await db
        .insertInto('productlist')
        .columns(['list_id', 'product_id', 'quantity', 'price', 'user_id'])
        .expression((eb) => eb
            .selectFrom('products')
            .where('id', 'in', products)
            .select((eb) => [
                eb.val(listId).as('list_id'),
                'products.id',
                eb.lit(0).as('quantity'),
                eb.lit(0).as('price'),
                eb.val(userId).as('user_id'),
            ])
        )
        .execute()
}

export async function updateProductList(id: string, newValues: ProductListUpdate) {
    let userId = await getUserId();

    await db.updateTable('productlist')
        .set(newValues)
        .where('id', '=', id)
        .where('user_id', '=', userId)
        .execute()
}

export async function deleteProductList(id: string) {
    let userId = await getUserId();

    return await db.deleteFrom('productlist')
        .where('id', '=', id)
        .where('user_id', '=', userId)
        .returningAll()
        .executeTakeFirst()
}

export async function findProductListById(id: string) {
    let userId = await getUserId();

    return await db.selectFrom('productlist')
        .innerJoin('products', 'productlist.product_id', 'products.id')
        .innerJoin('lists', 'productlist.list_id', 'lists.id')
        .where('productlist.id', '=', id)
        .where('productlist.user_id', '=', userId)
        .select([
            'productlist.id',
            'productlist.quantity',
            'productlist.price',
            'productlist.done',
            'products.name as product_name',
            'lists.name as list_name',
            'lists.id as list_id',
            'products.category'
        ])
        .executeTakeFirst()

}

export async function fetchProductListById(id: string) {
    let userId = await getUserId();

    return await db.selectFrom('productlist')
        .where('id', '=', id)
        .where('user_id', '=', userId)
        .select([
            'id',
            'product_id',
            'list_id',
            'quantity',
            'price',
            'done'
        ])
        .executeTakeFirst()

}

export async function findProductNotInList(listId: string) {
    let userId = await getUserId();
    return await db
        .selectFrom('products')
        .where(({ not, exists, selectFrom }) =>
            not(exists(
                selectFrom('productlist')
                    .select('product_id')
                    .where('productlist.list_id', '=', listId)
                    .whereRef('productlist.product_id', '=', 'products.id')
            ))
        )
        .select([
            'products.id',
            'products.name',
            'products.category',
        ])
        .where('user_id', '=', userId)
        .orderBy('products.name')
        .execute()
}
//#endregion ProductList Functions