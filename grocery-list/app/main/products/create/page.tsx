import Form from '@/app/ui/products/create-form';
import { CreateBreadcrumbs } from '@/app/ui/products/breadcrumbs';
import {Spacer} from "@nextui-org/react"
 
export default async function Page() {  
 
  return (
    <main>
      <CreateBreadcrumbs/>
      <Spacer y={4}/>
      <Form/>
    </main>
  );
}