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
import { PageTitle } from "@/app/ui/page-components"
import { updateProduct } from '@/app/lib/product-actions';
import { useFormState } from 'react-dom';
import { Product } from '@/app/lib/definitions';

export default function Form({product}:{product: Product}) {
  const initialState = { message: '', errors: {} };
  const updateProductWithId = updateProduct.bind(null, product.id)
  const [state, dispatch] = useFormState(updateProductWithId, initialState);

  return (
    <form action={dispatch}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        <PageTitle title="Editar Produto" />

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
      </div>
      <div className="mt-6 flex justify-end gap-4">
        <Button as={Link} href="/main/products" variant='flat'>Cancelar</Button>
        <Button type="submit" color='primary' >Atualizar</Button>
      </div>
    </form>
  );
}
