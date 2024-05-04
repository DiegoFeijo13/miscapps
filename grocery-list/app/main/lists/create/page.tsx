import Form from '@/components/lists/create-form';
import { CreateListBreadcrumbs } from '@/components/lists/breadcrumbs';
import {Spacer} from "@nextui-org/react"
import { CancelButton } from '@/components/buttons';
import {Title} from '@/components/title';
 
export default async function Page() {  
 
  return (
    <main>
      <CreateListBreadcrumbs/>
      <Spacer y={4}/>
      <Title text="Nova Lista" />
      
      <Spacer y={4} />
      <Form/>
      
      <Spacer y={4}/>
      <CancelButton href="/main/lists"/>
    </main>
  );
}