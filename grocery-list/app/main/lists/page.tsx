import { title } from "@/components/primitives"
import Table from '@/app/ui/lists/table';
import { CreateList } from '@/app/ui/lists/buttons';
import { fetchLists } from '@/app/lib/list-actions'
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
  const lists = await fetchLists();

  return (
    <>
      <h1 className={title()}>Listas</h1>
      <Spacer y={4} />
      <CreateList />
      <Spacer y={4} />
      <Suspense fallback={<TableSkeleton />}>
        <Table lists={lists} />
      </Suspense>
    </>
  );
}