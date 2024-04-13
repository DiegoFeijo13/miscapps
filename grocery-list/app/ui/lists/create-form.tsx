'use client'

import {
  CheckIcon,
  ClipboardDocumentListIcon,
  CalendarDaysIcon
} from '@heroicons/react/24/outline';
import {
  Input,
  Link,
  Button
} from '@nextui-org/react'
import { createList } from '@/app/lib/list-actions';
import { useFormState } from 'react-dom';

export default function Form() {
  const initialState = { message: '', errors: {} };
  const [state, dispatch] = useFormState(createList, initialState);

  return (
    <form action={dispatch}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">

        {/* Nome */}
        <div className="mb-4">
          <Input
            type='text'
            label='Nome'
            placeholder='Como deseja identificar a lista?'
            startContent={
              <ClipboardDocumentListIcon></ClipboardDocumentListIcon>
            }
          />

          <div id="name-error">
            {state.errors?.name &&
              state.errors.name.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>

        {/* Data */}
        <div className="mb-4">
          <Input
            type='text'
            label='Data'
            placeholder='Quando a compra será feita?'
            startContent={
              <CalendarDaysIcon></CalendarDaysIcon>
            }
          />

          <div id="date-error">
            {state.errors?.date &&
              state.errors.date.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>
      </div>
      <div className="mt-6 flex justify-end gap-4">
        <Link
          href="/main/lists"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Cancelar
        </Link>
        <Button type="submit">Criar Lista</Button>
      </div>
    </form>
  );
}
