import { Spacer } from "@nextui-org/spacer"
import {
  fetchCategories,
  fetchProducts
} from '@/app/lib/product-actions';
import { CreateButton } from "@/components/buttons";
import { Metadata } from "next";
import { Title } from "@/components/title";
import ProductsCards from "@/components/products/mobile-table";

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
      <ProductsCards products={products} categories={categories} />
    </>
  );
}