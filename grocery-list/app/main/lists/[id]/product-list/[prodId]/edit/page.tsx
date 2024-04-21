import Form from '@/app/ui/product-list/edit-form';
import { EditProductListBreadcrumbs } from '@/app/ui/product-list/breadcrumbs';
import { Button, Link, Spacer } from "@nextui-org/react"
import { fetchById, remove } from '@/app/lib/product-list-actions'
import { title } from '@/components/primitives';
import { CancelButton, DeleteButton } from '@/components/buttons';

export default async function Page({ params }: { params: { id: string, prodId: string } }) {
  const id = params.prodId;
  const productList = await fetchById(id);
  const deleteWithId = remove.bind(null, id);

  console.log(id)
  return (
    <main>
      <EditProductListBreadcrumbs productList={productList} />
      <Spacer y={4} />
      <h1 className={title()}>Editando compra do produto </h1>
      <h1 className={title({ color: 'violet' })}>{productList.product_name}</h1>

      <Spacer y={4} />
      <Form productList={productList} />

      <Spacer y={4} />
      <CancelButton href={`/main/lists/${productList.list_id}/product-list`} />

      <Spacer y={4} />
      <form action={deleteWithId}>
        <DeleteButton />
      </form>
    </main>
  );
}