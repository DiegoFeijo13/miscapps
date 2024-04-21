'use client'

import {
  GiftIcon,
  TagIcon
} from '@heroicons/react/24/outline';
import {
  Input,
  Button,
  Spacer,
  Autocomplete,
  AutocompleteItem
} from '@nextui-org/react'
import { create } from '@/app/lib/product-actions';
import { useFormState } from 'react-dom';

export default function Form({ categories }: { categories: string[] }) {
  const initialState = { message: '', errors: {} };
  const [state, dispatch] = useFormState(create, initialState);

  return (
    <form action={dispatch}>
      <Input
        type='text'
        label='Nome'
        name='name'
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
        isInvalid={state.errors?.category != undefined}
        errorMessage={state.errors?.category &&
          state.errors.category.map((error: string) => (`${error}`))}
        startContent={
          <TagIcon className="w-5" />
        }
      />

      <Spacer y={4} />
      <Button
        type="submit"
        color='primary'
        className='w-full'
      >
        Criar Produto
      </Button>
    </form>
  );
}
