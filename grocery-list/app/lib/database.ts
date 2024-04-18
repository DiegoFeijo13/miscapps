import {
    Database,
    List,
    ListUpdate,
    NewList
} from '@/app/lib/db_schema'
import { createKysely } from '@vercel/postgres-kysely'

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

export async function findAllLists(criteria: string, limit: number | null, offSet: number | null) {
    let query = db.selectFrom('lists')

    if(limit)
        query.limit(limit)

    if(offSet)
        query.offset(offSet)

    if (criteria && criteria.trim().length > 0) {
        query = query.where((eb) => eb.or([
            eb('name', 'ilike', criteria),
            eb('buy_dt', 'ilike', criteria)
        ]))
            .orderBy('buy_dt','desc')
    }

    return await query.selectAll().execute()
}
//#endregion
