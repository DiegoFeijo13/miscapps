'use client'

import { FC } from "react";
import {
  Button,
  Autocomplete,
  AutocompleteItem,
  Spacer
} from '@nextui-org/react'
import { create } from '@/app/lib/product-list-actions';
import { useFormState } from 'react-dom';
import { PlusIcon } from '@heroicons/react/16/solid';
import { Product } from '@/app/lib/definitions';

export interface AddProductProps {
  listId: string,
  category: string,
  products: Product[]
}

export const AddProductForm: FC<AddProductProps> = ({ listId, category, products }) => {
  const initialState = { message: '', errors: {} };
  const createWithId = create.bind(null, listId, category)
  const [state, dispatch] = useFormState(createWithId, initialState);

  return (
    <form action={dispatch}>
      <div className="w-full flex align-baseline justify-end">
        <Autocomplete
          allowsCustomValue
          label='Adicionar Produto'
          name='product_name'
          size="sm"
          className="mb-4"
          errorMessage={state.errors?.product_name &&
            state.errors.product_name?.map((error: string) => (`${error}`))}
        >
          {products.map((p) => (
            <AutocompleteItem key={p.name} value={p.name}>{p.name}</AutocompleteItem>
          ))}
        </Autocomplete>
        <Spacer x={4} />
        <Button
          isIconOnly
          type="submit"
          color='primary'
          startContent={<PlusIcon className='w-5' />}
        />
      </div>
    </form>
  );
}
