import { 
  PencilIcon, 
  PlusIcon, 
  TrashIcon,
  ClipboardDocumentIcon 
} from '@heroicons/react/24/outline';
import {
  Link,
  Button,
  ButtonGroup,
  Tooltip
} from '@nextui-org/react'
import { remove } from '@/app/lib/list-actions';

export function CreateList() {
  return (
    <Button
      href="/main/lists/create"
      as={Link}
      color="primary"
    >
      <span className="hidden md:block">Nova Lista</span>{' '}
      <PlusIcon className="h-5 md:ml-4" />
    </Button>
  );
}

export function ActionButtons({ id }: { id: string }) {
  const deleteListWithId = remove.bind(null, id);
  return (
    <form action={deleteListWithId}>
      <ButtonGroup>
      <Tooltip content='Comprar'>
        <Button
            isIconOnly
            color='primary'
            href={`/main/lists/${id}/product-list`}
            as={Link}
            variant='light'
          >
            <ClipboardDocumentIcon className="w-5" />
          </Button>
        </Tooltip>

        <Tooltip content='Editar'>
          <Button
            isIconOnly
            href={`/main/lists/${id}/edit`}
            as={Link}
            variant='light'
          >
            <PencilIcon className="w-5" />
          </Button>
        </Tooltip>

        <Tooltip content='Excluir'>
          <Button
            isIconOnly
            type='submit'
            color='danger'
            variant='light'
          >
            <TrashIcon className="w-5" />
          </Button>
        </Tooltip>
      </ButtonGroup>
    </form>
  );
}
