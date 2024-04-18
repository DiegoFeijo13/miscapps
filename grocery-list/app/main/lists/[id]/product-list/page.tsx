import { PageTitle } from "@/app/ui/page-components"
import Pagination from '@/app/ui/pagination';
import Search from '@/app/ui/search';
import Table from '@/app/ui/product-list/table';
import AddProductForm from '@/app/ui/product-list/add-product-form';
import { MainPageButtons } from '@/app/ui/product-list/buttons';
import {
  fetchListById
} from '@/app/lib/list-actions'
import { TableSkeleton } from '@/app/ui/lists/skeletons';
import { Suspense } from 'react';
import { Spacer } from "@nextui-org/spacer"
import { fetchAllProducts } from "@/app/lib/product-actions";

export default async function Page({ params }: { params: { id: string } }) {
  const id = params.id;
  const list = await fetchListById(id);
  const products = await fetchAllProducts();
  const totalPages = 1;
  // const products = []
  return (
    <>
      <PageTitle title={`Produtos da lista "${list.name}"`} />
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <MainPageButtons listId={list.id} />
        <Spacer x={8} />
        <Search placeholder="Buscar produtos na lista..." />
      </div>
      <Spacer y={4} />

      <AddProductForm listId={list.id} products={products} />
      
      {/* <Suspense key={query + currentPage} fallback={<TableSkeleton />}>
        <Table products={products} />
      </Suspense> */}
      <div className="mt-5 flex w-full justify-center">
        <Pagination totalPages={totalPages} />
      </div>
    </>
  );
}