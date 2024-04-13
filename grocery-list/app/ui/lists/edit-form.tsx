'use client'

import {List} from "@/app/lib/definitions"
import {
  ClipboardDocumentListIcon,
  CalendarDaysIcon
} from '@heroicons/react/24/outline';
import {
  Input,
  Link,
  Button,
  Spacer
} from '@nextui-org/react'
import { PageTitle } from "@/app/ui/page-components"
import { updateList } from '@/app/lib/list-actions';
import { useFormState } from 'react-dom';

export default function Form({list}:{list: List}) {
  const initialState = { message: '', errors: {} };
  const updateListWithId = updateList.bind(null, list.id)
  const [state, dispatch] = useFormState(updateListWithId, initialState);

  return (
    <form action={dispatch}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        <PageTitle title="Editar Lista" />

        <Spacer y={4} />
        <Input
          type='text'          
          label='Nome'
          name='name'
          defaultValue={list.name}
          placeholder='Como deseja identificar a lista?'
          isInvalid={state?.errors?.name != undefined}
          errorMessage={state?.errors?.name &&
            state.errors.name.map((error: string) => (`${error}`))}
          startContent={
            <ClipboardDocumentListIcon className="w-5"></ClipboardDocumentListIcon>
          }
        />

        <Spacer y={4} />
        <Input
          type='date'
          label='Data'
          name='date'
          defaultValue={new Date(list.buy_dt).toISOString().split('T')[0]}
          placeholder='Quando a compra será feita?'
          isInvalid={state?.errors?.date != undefined}
          errorMessage={state?.errors?.date &&
            state.errors.date.map((error: string) => (`${error}`))}
          startContent={
            <CalendarDaysIcon className="w-5"></CalendarDaysIcon>
          }
        />
      </div>
      <div className="mt-6 flex justify-end gap-4">
        <Button as={Link} href="/main/lists" variant='flat'>Cancelar</Button>
        <Button type="submit" color='primary'> Atualizar</Button>
      </div>
    </form>
  );
}
