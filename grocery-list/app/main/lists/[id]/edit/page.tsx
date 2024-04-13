import Form from '@/app/ui/lists/edit-form';
import { EditListBreadcrumbs }  from '@/app/ui/lists/breadcrumbs';
import {Spacer} from "@nextui-org/react"
import {fetchListById} from '@/app/lib/list-actions'

export default async function Page({ params }: { params: { id: string } }) {  
  const id = params.id;
  const list = await fetchListById(id);
  return (
    <main>
      <EditListBreadcrumbs/>
      <Spacer y={4}/>
      <Form list={list}/>
    </main>
  );
}