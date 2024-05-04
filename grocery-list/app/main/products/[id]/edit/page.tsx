import Form from '@/components/products/edit-form';
import { EditBreadcrumbs }  from '@/components/products/breadcrumbs';
import {Spacer} from "@nextui-org/react"
import {fetchProductById, remove} from '@/app/lib/product-actions'
import { CancelButton, DeleteButton } from '@/components/buttons';
import { Subtitle, Title } from '@/components/title';

export default async function Page({ params }: { params: { id: string } }) {  
  const id = params.id;
  const product = await fetchProductById(id);
  const deleteWithId = remove.bind(null, id);
  return (
    <main>
      <EditBreadcrumbs/>
      <Spacer y={4}/>
      <Subtitle text="Editando produto"/>
      <Title text={product.name}/>
      <Spacer y={4}/>
      <Form product={product}/>
      <Spacer y={4}/>
      <CancelButton href="/main/products" />
      <Spacer y={4} />
      <form action={deleteWithId}>
        <DeleteButton />
      </form>
    </main>
  );
}