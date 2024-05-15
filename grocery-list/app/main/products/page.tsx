import ProductsTable from "@/components/products/table";
import { Spacer } from "@nextui-org/spacer"
import {
  fetchCategories,
  fetchProducts
} from '@/app/lib/product-actions';
import { CreateButton } from "@/components/buttons";
import { Metadata } from "next";
import { Title } from "@/components/title";
import ProductsMobileTable from "@/components/products/mobile-table";

export const metadata: Metadata = {
  title: 'Produtos'
}

export default async function Page() {
  const categories = (await fetchCategories()).map((c) => { return c.category });
  const products = await fetchProducts();

  return (
    <>
      <Title text="Produtos" />
      <Spacer y={4} />
      <CreateButton href="/main/products/create" text="Novo Produto" />
      <Spacer y={4} />
      <div className='hidden md:inline-block w-full'>
        <ProductsTable products={products} categories={categories} />
      </div>
      <div className='md:hidden'>
        <ProductsMobileTable products={products} categories={categories} />
      </div>
    </>
  );
}