import { PencilIcon, PlusIcon, TrashIcon } from '@heroicons/react/24/outline';
import { Link, Button, ButtonGroup } from '@nextui-org/react'
import { deleteList } from '@/app/lib/list-actions';

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
  const deleteListWithId = deleteList.bind(null, id);
  return (
    <ButtonGroup>
      <Button
        isIconOnly
        href={`/main/lists/${id}/edit`}
        as={Link}
        variant='light'
      >
        <PencilIcon className="w-5" />
      </Button>
      <form action={deleteListWithId}>
      <Button
        isIconOnly
        type='submit'
        color='danger'
        variant='light'
      >
        <TrashIcon className="w-5" />
      </Button>
    </form>
    </ButtonGroup>
  );
}
