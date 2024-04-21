import Form from '@/app/ui/lists/create-form';
import { CreateListBreadcrumbs } from '@/app/ui/lists/breadcrumbs';
import {Button, Link, Spacer} from "@nextui-org/react"
import { title } from "@/components/primitives"
import { CancelButton } from '@/components/buttons';
 
export default async function Page() {  
 
  return (
    <main>
      <CreateListBreadcrumbs/>
      <Spacer y={4}/>
      <h1 className={title()}>Nova Lista</h1>
      
      <Spacer y={4} />
      <Form/>
      
      <Spacer y={4}/>
      <CancelButton href="/main/lists"/>
    </main>
  );
}