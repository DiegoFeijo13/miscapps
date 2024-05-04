"use client"
import {
  UserIcon,
  KeyIcon,
  ExclamationCircleIcon,
} from '@heroicons/react/24/outline';
import { ArrowRightIcon } from '@heroicons/react/20/solid';
import {
  Button,
  Input,
  Spacer
} from '@nextui-org/react';
import { useFormState, useFormStatus } from 'react-dom';
import { authenticate } from '@/app/lib/actions';
import { Title } from '@/components/title';

export default function LoginPage() {
  const [errorMessage, dispatch] = useFormState(authenticate, undefined);
  return (
    <form action={dispatch}>
    <Title text="Log in"/>
    <Spacer y={4} />
    <Input
      key="name"
      type="text"
      name="name"        
      placeholder='Usuário'        
      required
      startContent={<UserIcon className='w-5' />}
    />

    <Spacer y={4} />

    <Input
      key="password"
      type="password"
      name="password"        
      placeholder='Senha'        
      minLength={6}
      required
      startContent={<KeyIcon className='w-5' />}
    />


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
  );
}

function LoginButton() {
  const { pending } = useFormStatus();
  return (
    <Button
      isDisabled={pending}
      type='submit'
      color='primary'
      className='w-full'
      endContent={<ArrowRightIcon className="w-5" />} >
      Log in
    </Button>
  );
}