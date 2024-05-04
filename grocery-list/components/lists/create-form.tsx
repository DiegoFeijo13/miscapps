'use client'

import {
  ListBulletIcon,
  CalendarDaysIcon
} from '@heroicons/react/24/outline';
import {
  Input,
  Button,
  Spacer
} from '@nextui-org/react'
import { create } from '@/app/lib/list-actions';
import { useFormState, useFormStatus } from 'react-dom';
import { formatDateToEdit } from '@/app/lib/utils';
import { ExclamationCircleIcon } from '@heroicons/react/16/solid';

export default function Form() {
  const initialState = { message: '', errors: {} };
  const [state, dispatch] = useFormState(create, initialState);

  return (
    <form action={dispatch}>
      <Input
        type='text'
        label='Nome'
        name='name'
        aria-label='Nome da lista'
        defaultValue='Minha Lista'
        isInvalid={state.errors?.name != undefined}
        errorMessage={state.errors?.name &&
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
        defaultValue={formatDateToEdit(new Date())}
        isInvalid={state.errors?.date != undefined}
        errorMessage={state.errors?.date &&
          state.errors.date.map((error: string) => (`${error}`))}
        startContent={
          <CalendarDaysIcon className="w-5"></CalendarDaysIcon>
        }
      />

      <Spacer y={4} />

      <ConfirmButton />

    </form>
  );
}

function ConfirmButton() {
  const { pending } = useFormStatus();
  return (
    <Button
      isDisabled={pending}
      type='submit'
      color='primary'
      className='w-full'
    >
      Criar Lista
    </Button>
  );
}