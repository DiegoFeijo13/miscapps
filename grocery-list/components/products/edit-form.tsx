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
import { update } from '@/app/lib/product-actions';
import { useFormState } from 'react-dom';
import { Product } from '@/app/lib/definitions';

export default function Form({ product }: { product: Product }) {
  const initialState = { message: '', errors: {} };
  const updateProductWithId = update.bind(null, product.id)
  const [state, dispatch] = useFormState(updateProductWithId, initialState);

  return (
    <form action={dispatch}>

      <Spacer y={4} />
      <Input
        type='text'
        label='Nome'
        name='name'
        defaultValue={product.name}
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
        defaultValue={product.category}
        placeholder='Qual a categoria do produto?'
        isInvalid={state.errors?.category != undefined}
        errorMessage={state.errors?.category &&
          state.errors.category.map((error: string) => (`${error}`))}
        startContent={
          <TagIcon className="w-5" />
        }
      />

      <Spacer y={4} />
      <Button className='w-full' type="submit" color='primary' >Atualizar</Button>

    </form>
  );
}
