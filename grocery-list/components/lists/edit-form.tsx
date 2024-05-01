'use client'

import { List } from "@/app/lib/definitions"
import {
  ListBulletIcon,
  CalendarDaysIcon
} from '@heroicons/react/24/outline';
import {
  Input,
  Link,
  Button,
  Spacer
} from '@nextui-org/react'
import { edit } from '@/app/lib/list-actions';
import { useFormState } from 'react-dom';
import { formatDateToEdit } from "@/app/lib/utils";

export default function Form({ list }: { list: List }) {
  const initialState = { message: '', errors: {} };
  const editListWithId = edit.bind(null, list.id)
  const [state, dispatch] = useFormState(editListWithId, initialState);

  return (
    <form action={dispatch}>      
      <Input
        type='text'
        label='Nome'
        name='name'
        aria-label='Nome da lista'
        defaultValue={list.name}        
        isInvalid={state?.errors?.name != undefined}
        errorMessage={state?.errors?.name &&
          state.errors.name.map((error: string) => (`${error}`))}
        startContent={
          <ListBulletIcon className="w-5" />
        }
      />

      <Spacer y={4} />
      <Input
        type='date'
        label='Data'
        name='date'
        aria-label='Data da lista'
        defaultValue={formatDateToEdit(new Date(list.buy_dt))}        
        isInvalid={state?.errors?.date != undefined}
        errorMessage={state?.errors?.date &&
          state.errors.date.map((error: string) => (`${error}`))}
        startContent={
          <CalendarDaysIcon className="w-5" />
        }
      />

      <Spacer y={4} />
      
      <Button className="w-full" type="submit" color='primary'> Atualizar</Button>

    </form>
  );
}
