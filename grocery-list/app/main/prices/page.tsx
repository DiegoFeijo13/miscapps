import { Spacer } from "@nextui-org/spacer"
import {
  fetchCategories,
  fetchProducts
} from '@/app/lib/product-actions';
import { Metadata } from "next";
import { Title } from "@/components/title";
import ProductsCards from "@/components/prices/mobile-table";

export const metadata: Metadata = {
  title: 'Produtos'
}

export default async function Page() {
  const categories = (await fetchCategories()).map((c) => { return c.category });
  const products = await fetchProducts();

  return (
    <>
      <Title text="Preços" />            
      <Spacer y={4} />
      <ProductsCards products={products} categories={categories} />
    </>
  );
}