import { title } from "@/components/primitives"
import ByCategory from '@/app/ui/products/by-category'
import { Spacer } from "@nextui-org/spacer"
import {
  fetchCategories,
  fetchProducts
} from '@/app/lib/product-actions';
import { CreateButton } from "@/components/buttons";

export default async function Page() {
  const categories = (await fetchCategories()).map((c) => { return c.category });
  const products = await fetchProducts();

  return (
    <>
      <h1 className={title()}>Produtos</h1>
      <Spacer y={4} />
      <CreateButton href="/main/products/create" text="Novo Produto" />
      <Spacer y={4} />
      <ByCategory products={products} categories={categories} />
    </>
  );
}