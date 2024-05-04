import {
  PlusIcon
} from '@heroicons/react/24/outline';
import {
  Link,
  Button
} from '@nextui-org/react'
import React from 'react';

export function CreateButton({ href, text }: { href: string, text: string }) {
  return (
    <Button
      href={href}
      as={Link}
      size='sm'
      variant='flat'
      color="primary"
      className='w-full'
      startContent={<PlusIcon className="w-5" />}
    >
      {text}
    </Button>
  );
}

export function CancelButton({ href }: { href: string }) {
  return (
    <Button
      as={Link}
      className='w-full'
      href={href}
      variant='flat'>Cancelar</Button>
  )
}

export function DeleteButton() {  
  return (
    <Button      
      className='w-full'
      type='submit'
      variant='flat'
      color='danger'
      >
      Excluir
    </Button>
  )
}
