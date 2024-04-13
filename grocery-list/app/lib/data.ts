import { sql } from '@vercel/postgres';
import {
    Category,
    Product,
    List
} from './definitions';

const ITEMS_PER_PAGE = 6;

export async function fetchCategories() {
    try {
        const categories = await sql<Category>`SELECT DISTINCT p.category as name from products p ORDER BY 1 DESC`;

        return categories.rows;
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Falha ao carregar produtos.');
    }
}

export async function fetchFilteredProducts(
    query: string,
    category: string,
    currentPage: number,
) {
    const offset = (currentPage - 1) * ITEMS_PER_PAGE;

    try {
        const products = await sql<Product>`
            SELECT
                p.id,
                p.name,
                p.category
            FROM products p      
            WHERE 1=1
                AND p.name ILIKE ${`%${query}%`}
                AND p.category ILIKE ${`${category}`} 
            ORDER BY 
                p.name
            LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}`;

        return products.rows;
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error(`Falha ao carregar produtos. Parametros: query(${query}) category(${category}) currentPage(${currentPage})`);
    }
}

export async function fetchProductPages(query: string, category: string) {    
    try {
        const count = await sql`SELECT COUNT(*)
      FROM products p      
      WHERE 1=1
        AND p.name ILIKE ${`%${query}%`} 
        AND p.category ILIKE ${`${category}`}`;

        const totalPages = Math.ceil(Number(count.rows[0].count) / ITEMS_PER_PAGE);
        return totalPages;
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Falha ao obter número total de produtos.');
    }
}

export async function fetchFilteredLists(
    query: string,    
    currentPage: number,
) {
    const offset = (currentPage - 1) * ITEMS_PER_PAGE;

    try {
        const lists = await sql<List>`
            SELECT
                l.id,
                l.name,
                l.buy_dt
            FROM lists l      
            WHERE l.name ILIKE ${`%${query}%`}
                OR l.buy_dt::text ILIKE ${`%${query}%`} 
            ORDER BY 
                l.buy_dt DESC
            LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}`;

        return lists.rows;
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error(`Falha ao carregar listas. Parametros: query(${query}) currentPage(${currentPage})`);
    }
}

export async function fetchListPages(query: string) {    
    try {
        const count = await sql`SELECT COUNT(*)
      FROM lists l      
      WHERE l.name ILIKE ${`%${query}%`} 
        OR l.buy_dt::text ILIKE ${`%${query}%`}`;

        const totalPages = Math.ceil(Number(count.rows[0].count) / ITEMS_PER_PAGE);
        return totalPages;
    } catch (error) {
        console.error('Erro no Banco de Dados:', error);
        throw new Error('Falha ao obter número total de listas.');
    }
}