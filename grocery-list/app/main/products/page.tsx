import Pagination from '@/app/ui/pagination';
import Search from '@/app/ui/search';
import Table from '@/app/ui/products/table';
import CategorySelect from '@/app/ui/products/category-select'
import { CreateProduct } from '@/app/ui/products/buttons';
import { ProductsTableSkeleton } from '@/app/ui/skeletons';
import { Suspense} from 'react';
import { fetchProductPages, fetchCategories } from '@/app/lib/data';

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
  const categories = (await fetchCategories()).map((c) => {return c.name});  

  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className='text-2xl'>Produtos</h1>
      </div>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Search placeholder="Buscar produtos..." />
        <CreateProduct />
      </div>
      <CategorySelect categories={categories}></CategorySelect>
      <Suspense key={query + currentPage} fallback={<ProductsTableSkeleton />}>
        <Table query={query} category={category} currentPage={currentPage} />
      </Suspense>
      <div className="mt-5 flex w-full justify-center">
        <Pagination totalPages={totalPages} />
      </div>
    </div>
  );
}