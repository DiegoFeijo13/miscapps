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
      size='sm'
      variant='flat'
      color="primary"
      className='w-full'
      startContent={<PlusIcon className="w-5" />}
    >
      Nova Lista
    </Button>
  );
}
