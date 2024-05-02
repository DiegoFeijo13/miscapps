import Form from '@/components/lists/create-form';
import { CreateListBreadcrumbs } from '@/components/lists/breadcrumbs';
import {Button, Link, Spacer} from "@nextui-org/react"
import { title } from "@/components/primitives"
import { CancelButton } from '@/components/buttons';
 
export default async function Page() {  
 
  return (
    <main>
      <CreateListBreadcrumbs/>
      <Spacer y={4}/>
      <div className="w-full flex text-center items-center justify-center">
        <span className={title({ color: 'violet' })}>Nova Lista</span>
      </div>
      
      <Spacer y={4} />
      <Form/>
      
      <Spacer y={4}/>
      <CancelButton href="/main/lists"/>
    </main>
  );
}