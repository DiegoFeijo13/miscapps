import Form from '@/app/ui/lists/create-form';
import { CreateListBreadcrumbs } from '@/app/ui/lists/breadcrumbs';
import {Button, Link, Spacer} from "@nextui-org/react"
import { title } from "@/components/primitives"
 
export default async function Page() {  
 
  return (
    <main>
      <CreateListBreadcrumbs/>
      <Spacer y={4}/>
      <h1 className={title()}>Nova Lista</h1>
      
      <Spacer y={4} />
      <Form/>
      
      <Spacer y={4}/>
      <Button
        as={Link}
        href="/main/lists"
        variant='flat'
        className='w-full'
      >
        Cancelar
      </Button>
    </main>
  );
}