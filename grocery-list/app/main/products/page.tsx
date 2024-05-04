import { title } from "@/components/primitives"
import ProductsTable from "@/components/products/table";
import { Spacer } from "@nextui-org/spacer"
import {
  fetchCategories,
  fetchProducts
} from '@/app/lib/product-actions';
import { CreateButton } from "@/components/buttons";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Produtos'
}

export default async function Page() {
  const categories = (await fetchCategories()).map((c) => { return c.category });
  const products = await fetchProducts();

  return (
    <>
      <div className="w-full flex text-center items-center justify-center">
        <span className={title({ color: 'violet' })}>Produtos</span>
      </div>
      <Spacer y={4} />
      <CreateButton href="/main/products/create" text="Novo Produto" />
      <Spacer y={4} />
      <ProductsTable products={products} categories={categories} />
    </>
  );
}