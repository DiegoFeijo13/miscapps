import Form from '@/app/ui/lists/create-form';
import Breadcrumbs from '@/app/ui/lists/breadcrumbs';
import {Spacer} from "@nextui-org/react"
 
export default async function Page() {  
 
  return (
    <main>
      <Breadcrumbs/>
      <Spacer y={4}/>
      <Form/>
    </main>
  );
}