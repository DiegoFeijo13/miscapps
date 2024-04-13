import Form from '@/app/ui/products/edit-form';
import { EditBreadcrumbs }  from '@/app/ui/products/breadcrumbs';
import {Spacer} from "@nextui-org/react"
import {fetchProductById} from '@/app/lib/product-actions'

export default async function Page({ params }: { params: { id: string } }) {  
  const id = params.id;
  const product = await fetchProductById(id);
  return (
    <main>
      <EditBreadcrumbs/>
      <Spacer y={4}/>
      <Form product={product}/>
    </main>
  );
}