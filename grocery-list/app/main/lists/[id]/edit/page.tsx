import Form from '@/components/lists/edit-form';
import { EditListBreadcrumbs } from '@/components/lists/breadcrumbs';
import { Button, Link, Spacer } from "@nextui-org/react"
import { title, subtitle } from "@/components/primitives"
import { fetchListById, remove } from '@/app/lib/list-actions'
import { CancelButton, DeleteButton } from '@/components/buttons';
import { Title } from '@/components/title';

export default async function Page({ params }: { params: { id: string } }) {
  const id = params.id;
  const list = await fetchListById(id);
  const deleteListWithId = remove.bind(null, id);

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
      <form action={deleteListWithId}>
        <DeleteButton />
      </form>
    </main>
  );
}