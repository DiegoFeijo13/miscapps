import Form from '@/app/ui/lists/create-form';
import { CreateListBreadcrumbs } from '@/app/ui/lists/breadcrumbs';
import {Spacer} from "@nextui-org/react"
 
export default async function Page() {  
 
  return (
    <main>
      <CreateListBreadcrumbs/>
      <Spacer y={4}/>
      <Form/>
    </main>
  );
}