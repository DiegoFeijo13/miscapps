import Form from '@/components/product-list/create-form';
import { CreateProductListBreadcrumbs } from '@/components/product-list/breadcrumbs';
import {Button, Link, Spacer} from "@nextui-org/react"
import {fetchListById} from '@/app/lib/list-actions'
import {fetchProductById} from '@/app/lib/product-actions'
import { title } from '@/components/primitives';
import { CancelButton } from '@/components/buttons';
 
export default async function Page({ params }: { params: { id: string, prodId: string } }) {  

    const list = await fetchListById(params.id);
    const product = await fetchProductById(params.prodId)
 
  return (
    <main>
      <CreateProductListBreadcrumbs list={list} product={product}/>
      <Spacer y={4}/>

      <h1 className={title()}>Comprando produto </h1>

      <h1 className={title({ color: 'violet' })}>{product.name}</h1>
      
      <Form list={list} product={product}/>
      
      <Spacer y={4} />
      <CancelButton href={`/main/lists/${list.id}/product-list`} />
    </main>
  );
}