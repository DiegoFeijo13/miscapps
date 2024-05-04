import Form from '@/components/product-list/edit-form';
import { EditProductListBreadcrumbs } from '@/components/product-list/breadcrumbs';
import { Button, Link, Spacer } from "@nextui-org/react"
import { fetchById, remove } from '@/app/lib/product-list-actions'
import { CancelButton, DeleteButton } from '@/components/buttons';
import { Subtitle, Title } from '@/components/title';

export default async function Page({ params }: { params: { id: string, prodId: string } }) {
  const id = params.prodId;
  const productList = await fetchById(id);
  const deleteWithId = remove.bind(null, id);

  return (
    <main>
      <EditProductListBreadcrumbs productList={productList} />
      <Spacer y={4} />
      <Subtitle text="Editando compra do produto" />
      <Title text={productList.product_name} />

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