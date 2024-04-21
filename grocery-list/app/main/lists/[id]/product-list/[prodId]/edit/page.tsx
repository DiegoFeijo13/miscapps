import Form from '@/app/ui/product-list/edit-form';
import { EditProductListBreadcrumbs }  from '@/app/ui/product-list/breadcrumbs';
import {Spacer} from "@nextui-org/react"
import {fetchById} from '@/app/lib/product-list-actions'

export default async function Page({ params }: { params: { id: string, prodId: string } }) {  
  const id = params.prodId;
  const productList = await fetchById(id);
  
  console.log(id)
  return (
    <main>
      <EditProductListBreadcrumbs productList={productList}/>
      <Spacer y={4}/>
      <Form productList={productList}/>
    </main>
  );
}