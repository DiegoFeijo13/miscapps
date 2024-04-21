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

export default function Form({product, list}:{product:Product, list: List}) {
  const initialState = { message: '', errors: {} };
  const [state, dispatch] = useFormState(create, initialState);

  return (
    <form action={dispatch}>
      <input type='hidden' name='list_id' value={list.id} />
      <input type='hidden' name='product_id' value={product.id} />
      
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        <h1 className={title()}>{`Comprando produto ${product.name}`}</h1>

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
      </div>
      <div className="mt-6 flex justify-end gap-4">
        <Button
          as={Link}
          href={`/main/lists/${list.id}/product-list`}
          variant='flat'
        >
          Cancelar
        </Button>
        <Button
          type="submit"
          color='primary'
        >
          Comprar
        </Button>
      </div>
    </form>
  );
}
