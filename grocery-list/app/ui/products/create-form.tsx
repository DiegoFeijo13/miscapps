'use client'

import {
  GiftIcon,
  TagIcon
} from '@heroicons/react/24/outline';
import {
  Input,
  Link,
  Button,
  Spacer
} from '@nextui-org/react'
import { title } from "@/components/primitives"
import { createProduct } from '@/app/lib/product-actions';
import { useFormState } from 'react-dom';

export default function Form() {
  const initialState = { message: '', errors: {} };
  const [state, dispatch] = useFormState(createProduct, initialState);

  return (
    <form action={dispatch}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        <h1 className={title()}>Novo Produto</h1>

        <Spacer y={4} />
        <Input
          type='text'          
          label='Nome'
          name='name'
          placeholder='Como deseja identificar o produto?'
          isInvalid={state.errors?.name != undefined}
          errorMessage={state.errors?.name &&
            state.errors.name.map((error: string) => (`${error}`))}
          startContent={
            <GiftIcon className="w-5" />
          }
        />

        <Spacer y={4} />
        <Input
          type='text'
          label='Categoria'
          name='category'
          placeholder='Qual a categoria do produto?'
          isInvalid={state.errors?.category != undefined}
          errorMessage={state.errors?.category &&
            state.errors.category.map((error: string) => (`${error}`))}
          startContent={
            <TagIcon className="w-5" />
          }
        />
      </div>
      <div className="mt-6 flex justify-end gap-4">
        <Button
          as={Link}
          href="/main/products"
          variant='flat'
        >
          Cancelar
        </Button>
        <Button
          type="submit"
          color='primary'
        >
          Criar Produto
        </Button>
      </div>
    </form>
  );
}
