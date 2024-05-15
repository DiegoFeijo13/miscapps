import Table from '@/components/lists/table';
import MobileTable from '@/components/lists/mobile-table';
import { CreateButton } from '@/components/buttons';
import { getListsWithTotals } from '@/app/lib/list-actions'
import { Spacer } from "@nextui-org/spacer"
import { Title } from "@/components/title";

export default async function Page() {
  const lists = await getListsWithTotals();

  return (
    <>
      <Title text="Listas" />
      <Spacer y={4} />
      <CreateButton href="/main/lists/create" text="Nova Lista" />
      <Spacer y={4} />
      <div className='hidden md:inline-block w-full'>
        <Table lists={lists} />
      </div>
      <div className='md:hidden'>
        <MobileTable lists={lists} />
      </div>
    </>
  );
}