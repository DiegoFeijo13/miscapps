import Form from '@/components/products/edit-form';
import { EditBreadcrumbs }  from '@/components/products/breadcrumbs';
import {Spacer} from "@nextui-org/react"
import {fetchProductById, remove} from '@/app/lib/product-actions'
import { subtitle, title } from '@/components/primitives';
import { CancelButton, DeleteButton } from '@/components/buttons';

export default async function Page({ params }: { params: { id: string } }) {  
  const id = params.id;
  const product = await fetchProductById(id);
  const deleteWithId = remove.bind(null, id);
  return (
    <main>
      <EditBreadcrumbs/>
      <Spacer y={4}/>
      <h2 className={title()}>Editando produto</h2>
      <h1 className={subtitle()}>{product.name}</h1>
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