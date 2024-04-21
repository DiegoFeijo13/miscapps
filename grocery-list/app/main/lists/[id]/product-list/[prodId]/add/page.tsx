import Form from '@/app/ui/product-list/create-form';
import { CreateProductListBreadcrumbs } from '@/app/ui/product-list/breadcrumbs';
import {Spacer} from "@nextui-org/react"
import {fetchListById} from '@/app/lib/list-actions'
import {fetchProductById} from '@/app/lib/product-actions'
 
export default async function Page({ params }: { params: { id: string, prodId: string } }) {  

    const list = await fetchListById(params.id);
    const product = await fetchProductById(params.prodId)
 
  return (
    <main>
      <CreateProductListBreadcrumbs list={list} product={product}/>
      <Spacer y={4}/>
      <Form list={list} product={product}/>
    </main>
  );
}