import Form from '@/components/lists/edit-form';
import { EditListBreadcrumbs } from '@/components/lists/breadcrumbs';
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
      <div className="w-full flex text-center items-center justify-center">
        <span className={title({ color: 'violet' })}>{list.name}</span>
      </div>    

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