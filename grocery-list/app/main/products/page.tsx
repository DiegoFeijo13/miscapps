import { PageTitle } from "@/app/ui/page-components"
import Pagination from '@/app/ui/pagination';
import Search from '@/app/ui/search';
import Table from '@/app/ui/products/table';
import CategorySelect from '@/app/ui/products/category-select'
import { CreateProduct } from '@/app/ui/products/buttons';
import { ProductsTableSkeleton } from '@/app/ui/skeletons';
import { Suspense } from 'react';
import { Spacer } from "@nextui-org/spacer"
import {
  fetchProductPages,
  fetchCategories,
  fetchFilteredProducts
} from '@/app/lib/product-actions';

export default async function Page({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
    category?: string;
  };
}) {
  const query = searchParams?.query || '';
  const category = searchParams?.category || '';
  const currentPage = Number(searchParams?.page) || 1;
  const totalPages = await fetchProductPages(query, category);
  const categories = (await fetchCategories()).map((c) => { return c.name });
  const products = await fetchFilteredProducts(query, category, currentPage);

  return (
    <>
      <PageTitle title="Produtos"/>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Search placeholder="Buscar produtos..." />
        <CreateProduct />
      </div>
      <CategorySelect categories={categories}></CategorySelect>
      <Spacer y={4} />
      <Suspense key={query + currentPage} fallback={<ProductsTableSkeleton />}>
        <Table products={products} />
      </Suspense>
      <div className="mt-5 flex w-full justify-center">
        <Pagination totalPages={totalPages} />
      </div>
    </>
  );
}