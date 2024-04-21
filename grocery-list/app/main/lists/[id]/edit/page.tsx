import Form from '@/app/ui/lists/edit-form';
import { EditListBreadcrumbs } from '@/app/ui/lists/breadcrumbs';
import { Button, Link, Spacer } from "@nextui-org/react"
import { title, subtitle } from "@/components/primitives"
import { fetchListById, remove } from '@/app/lib/list-actions'
import { CancelButton, DeleteButton } from '@/components/buttons';

export default async function Page({ params }: { params: { id: string } }) {
  const id = params.id;
  const list = await fetchListById(id);
  const deleteListWithId = remove.bind(null, id);

  return (
    <main>
      <EditListBreadcrumbs />
      <Spacer y={4} />
      <h2 className={title()}>Editando lista</h2>
      <h1 className={subtitle()}>{list.name}</h1>

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