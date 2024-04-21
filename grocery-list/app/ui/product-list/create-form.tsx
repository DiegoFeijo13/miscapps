'use client'

import {
  CalculatorIcon,
  CurrencyDollarIcon
} from '@heroicons/react/24/outline';
import {
  Input,
  Link,
  Button,
  Spacer
} from '@nextui-org/react'
import { title } from "@/components/primitives"
import { create } from '@/app/lib/product-list-actions';
import { useFormState } from 'react-dom';
import { List, Product } from '@/app/lib/definitions';

export default function Form({ product, list }: { product: Product, list: List }) {
  const initialState = { message: '', errors: {} };
  const [state, dispatch] = useFormState(create, initialState);

  return (
    <form action={dispatch}>
      <input type='hidden' name='list_id' value={list.id} />
      <input type='hidden' name='product_id' value={product.id} />

      <Spacer y={4} />
      <Input
        type='number'
        label='Quantidade'
        name='quantity'
        placeholder='0,00'
        isInvalid={state.errors?.quantity != undefined}
        errorMessage={state.errors?.quantity &&
          state.errors.quantity.map((error: string) => (`${error}`))}
        startContent={
          <CalculatorIcon className="w-5" />
        }
      />

      <Spacer y={4} />
      <Input
        type='number'
        label='Preço'
        name='price'
        placeholder='0,00'
        isInvalid={state.errors?.price != undefined}
        errorMessage={state.errors?.price &&
          state.errors.price.map((error: string) => (`${error}`))}
        startContent={
          <CurrencyDollarIcon className="w-5" />
        }
      />

      <Spacer y={4} />
      <Button
        type="submit"
        color='primary'
        className='w-full'
      >
        Comprar
      </Button>

    </form>
  );
}
