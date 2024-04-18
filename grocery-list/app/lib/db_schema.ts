import {
    Generated,
    ColumnType,
    Insertable,
    Selectable,
    Updateable    
} from 'kysely'

export interface Database {    
    products: ProductsTable
    productList: ProductListTable
    lists: ListsTable
}

export interface ProductsTable {
    id: Generated<string>;
    name : string;
    category: string;
}

export type Product = Selectable<ProductsTable>
export type NewProduct = Insertable<ProductsTable>
export type ProductUpdate = Updateable<ProductsTable>

export interface ProductListTable {
    id: Generated<string>;
    product_id: string;
    list_id: string;
    quantity: number | null;
    price: number | null;
    bought: boolean | null;
}

export type ProductList = Selectable<ProductListTable>
export type NewProductList = Insertable<ProductListTable>
export type ProductListUpdate = Updateable<ProductListTable>

export interface ListsTable {
    id: Generated<string>;
    name : string;
    buy_dt: ColumnType<string, Date, Date>;
}

export type List = Selectable<ListsTable>
export type NewList = Insertable<ListsTable>
export type ListUpdate = Updateable<ListsTable>