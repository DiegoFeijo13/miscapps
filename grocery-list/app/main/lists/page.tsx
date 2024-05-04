import Table from '@/components/lists/table';
import { CreateButton } from '@/components/buttons';
import { fetchLists } from '@/app/lib/list-actions'
import { Spacer } from "@nextui-org/spacer"
import {Title} from "@/components/title";

export default async function Page() {
  const lists = await fetchLists();

  return (
    <>
      <Title text="Listas"/>
      <Spacer y={4} />
      <CreateButton href="/main/lists/create" text="Nova Lista" />
      <Spacer y={4} />
      <Table lists={lists} />
    </>
  );
}