import Form from '@/components/lists/edit-form';
import { EditListBreadcrumbs } from '@/components/lists/breadcrumbs';
import { Spacer } from "@nextui-org/react"
import { fetchListById } from '@/app/lib/list-actions'
import { CancelButton } from '@/components/buttons';
import { Title } from '@/components/title';

export default async function Page({ params }: { params: { id: string } }) {
  const id = params.id;
  const list = await fetchListById(id);  

  return (
    <main>
      <EditListBreadcrumbs />
      <Spacer y={4} />
      <Title text={list.name}/>

      <Spacer y={4} />
      <Form list={list} />

      <Spacer y={4} />
      <CancelButton href="/main/lists"/>

      <Spacer y={4} />
    </main>
  );
}