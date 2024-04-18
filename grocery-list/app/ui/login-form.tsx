'use client'

import {
  AtSymbolIcon,
  KeyIcon,
  ExclamationCircleIcon,
} from '@heroicons/react/24/outline';
import { ArrowRightIcon } from '@heroicons/react/20/solid';
import {
  Button,
  Card,
  CardBody,
  Input,
  Spacer
} from '@nextui-org/react';
import { useFormState, useFormStatus } from 'react-dom';
import { authenticate } from '@/app/lib/actions';

export default function LoginForm() {
  const [errorMessage, dispatch] = useFormState(authenticate, undefined);
  return (
    <Card className='p-4'>
      <CardBody>
        <form action={dispatch} className="space-y-3">
          <h1>Informe suas credenciais para continuar</h1>

          <Spacer y={4} />

          <div className="w-full">
            <Input
              key="email"
              type="email"
              name="email"
              label="E-mail"
              placeholder='Informe seu e-mail'
              labelPlacement='outside'
              required
              startContent={<AtSymbolIcon className='w-5' />}
            />

            <Spacer y={4} />

            <Input
              key="password"
              type="password"
              name="password"
              label="Senha"
              placeholder='******'
              labelPlacement='outside'
              minLength={6}
              required
              startContent={<KeyIcon className='w-5' />}
            />
          </div>

          <Spacer y={4} />

          <LoginButton />

          <div
            className="flex h-8 items-end space-x-1"
            aria-live="polite"
            aria-atomic="true"
          >
            {errorMessage && (
              <>
                <ExclamationCircleIcon className="h-5 w-5 text-red-500" />
                <p className="text-sm text-red-500">{errorMessage}</p>
              </>
            )}
          </div>
        </form>
      </CardBody>
    </Card>

  );
}

function LoginButton() {
  const { pending } = useFormStatus();
  return (
    <Button
      isDisabled={ pending }
      type='submit'
      color='primary'
      className='w-full'
      endContent={<ArrowRightIcon className="w-5" />} >
      Log in
    </Button>
  );
}
