import {
    Generated,
    ColumnType,
    Insertable,
    Selectable,
    Updateable    
} from 'kysely'

export interface Database {    
    products: ProductsTable
    productlist: ProductListTable
    lists: ListsTable
    users: UsersTable
}

export interface UsersTable {
    id: Generated<string>;
    name: string;
    password: string;
}

export type User = Selectable<UsersTable>
export type NewUser = Insertable<UsersTable>
export type UserUpdate = Updateable<UsersTable>
export interface ProductsTable {
    id: Generated<string>;
    name : string;
    category: string;
    user_id: string
}

export type Product = Selectable<ProductsTable>
export type NewProduct = Insertable<ProductsTable>
export type ProductUpdate = Updateable<ProductsTable>

export interface ProductListTable {
    id: Generated<string>;
    product_id: string;
    list_id: string;
    user_id: string;
    quantity: number;
    price: number;
    done: boolean;
}

export type ProductList = Selectable<ProductListTable>
export type NewProductList = Insertable<ProductListTable>
export type ProductListUpdate = Updateable<ProductListTable>

export interface ListsTable {
    id: Generated<string>;
    name : string;
    buy_dt: ColumnType<string, Date, Date>;
    user_id: string;
}

export type List = Selectable<ListsTable>
export type NewList = Insertable<ListsTable>
export type ListUpdate = Updateable<ListsTable>