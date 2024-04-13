import { PageTitle } from "@/app/ui/page-components"
import Pagination from '@/app/ui/pagination';
import Search from '@/app/ui/search';
import Table from '@/app/ui/lists/table';
import { CreateList } from '@/app/ui/lists/buttons';
import {
  fetchListPages,
  fetchFilteredLists
} from '@/app/lib/data'
import { TableSkeleton } from '@/app/ui/lists/skeletons';
import { Suspense } from 'react';
import { Spacer } from "@nextui-org/spacer"

export default async function Page({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
  };
}) {
  const query = searchParams?.query || '';
  const currentPage = Number(searchParams?.page) || 1;
  const totalPages = await fetchListPages(query);
  const lists = await fetchFilteredLists(query, currentPage);  

  console.log(lists)

  return (
    <>
      <PageTitle title="Listas"/>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Search placeholder="Buscar listas..." />
        <CreateList />
      </div>
      <Spacer y={4} />
      <Suspense key={query + currentPage} fallback={<TableSkeleton />}>
        <Table lists={lists} />
      </Suspense>
      <div className="mt-5 flex w-full justify-center">
        <Pagination totalPages={totalPages} />
      </div>
    </>
  );
}