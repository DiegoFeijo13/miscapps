import Form from '@/components/products/create-form';
import { CreateBreadcrumbs } from '@/components/products/breadcrumbs';
import {Button, Link, Spacer} from "@nextui-org/react"
import { title } from '@/components/primitives';
import { fetchCategories } from '@/app/lib/product-actions';
import { CancelButton } from '@/components/buttons';
 
export default async function Page() {  

  const categories = (await fetchCategories()).map((c) => {return c.category})
 
  return (
    <main>
      <CreateBreadcrumbs/>
      <Spacer y={4}/>
      <h1 className={title()}>Novo Produto</h1>
      
      <Spacer y={4} />
      <Form categories={categories}/>
      
      <Spacer y={4}/>
      <CancelButton href="/main/products"/>
    </main>
  );
}