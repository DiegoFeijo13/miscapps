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
import { PageTitle } from "@/app/ui/page-components"
import { edit } from '@/app/lib/product-list-actions';
import { useFormState } from 'react-dom';
import { ProductListEditVM } from '@/app/lib/definitions';

export default function Form({ productList }: { productList: ProductListEditVM }) {
  const initialState = { message: '', errors: {} };
  const productListId = productList.id;
  const editWithId = edit.bind(null, productListId)
  const [state, dispatch] = useFormState(editWithId, initialState);

  return (
    <form action={dispatch}>
      <input type='hidden' name='list_id' value={productList.list_id} />
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        <PageTitle title={`Editando compra do produto ${productList.product_name}`} />

        <Spacer y={4} />
        <Input
          type='number'
          label='Quantidade'
          name='quantity'
          placeholder='0,00'
          defaultValue={productList.quantity?.toString()}
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
          defaultValue={productList.price.toString()}
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
          href={`/main/lists/${productList.list_id}/product-list`}
          variant='flat'
        >
          Cancelar
        </Button>
        <Button
          type="submit"
          color='primary'
        >
          Confirmar
        </Button>
      </div>
    </form>
  );
}
