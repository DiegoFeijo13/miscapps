import { PencilIcon, PlusIcon, TrashIcon } from '@heroicons/react/24/outline';
import {Link, Button} from '@nextui-org/react'
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

export function UpdateProduct({ id }: { id: string }) {
  return (
    <Link
      href={`/main/products/${id}/edit`} 
      className="rounded-md border p-2 hover:bg-gray-100"
    >
      <PencilIcon className="w-5" />
    </Link>
  );
}

export function DeleteProduct({ id }: { id: string }) {
  const deleteProductWithId = deleteProduct.bind(null, id);
  return (
    <form action={deleteProductWithId}>
      <button className="rounded-md border p-2 hover:bg-gray-100">
        <span className="sr-only">Apagar</span>
        <TrashIcon className="w-5" />
      </button>
    </form>
  );
}
