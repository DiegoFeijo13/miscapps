import { PencilIcon, PlusIcon, TrashIcon } from '@heroicons/react/24/outline';
import { Link, Button, ButtonGroup } from '@nextui-org/react'
import { deleteProduct } from '@/app/lib/product-actions';

export function CreateProduct() {
  return (
    <Button
      href="/main/products/create"
      as={Link}
      color="primary"
    >
      <span className="hidden md:block">Criar Produto</span>{' '}
      <PlusIcon className="h-5 md:ml-4" />
    </Button>
  );
}

export function ActionButtons({ id }: { id: string }) {
  const deleteProductWithId = deleteProduct.bind(null, id);
  return (
    <ButtonGroup>
      <Button
        isIconOnly
        href={`/main/products/${id}/edit`}
        as={Link}
        variant='light'
      >
        <PencilIcon className="w-5" />
      </Button>
      <form action={deleteProductWithId}>
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