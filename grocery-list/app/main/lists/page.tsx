import ListsCards from '@/components/lists/mobile-table';
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
      <ListsCards lists={lists} />
    </>
  );
}