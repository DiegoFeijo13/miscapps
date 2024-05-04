import { subtitle, title } from "@/components/primitives"
import { Spacer } from "@nextui-org/react"
import {fetchListById} from "@/app/lib/list-actions";
import {fetchProductsNotInList} from "@/app/lib/product-list-actions";
import { AddProductListBreadcrumbs } from "@/components/product-list/breadcrumbs";
import AddList from "@/components/product-list/add-list";
import { Subtitle, Title } from "@/components/title";

export default async function Page({ params }: { params: { id: string } }) {

  const listId = params.id;
  const list = await fetchListById(listId) || { name: '' };
  const productsToAdd = await fetchProductsNotInList(listId)
  
  return (
    <>
      <AddProductListBreadcrumbs listId={listId}/>
      <Spacer y={4} />
      <Title text={list.name}/>
      
      <Subtitle text="Adicionar Produtos" />

      <Spacer y={4} />
      <AddList products={productsToAdd} listId={listId} />
    </>
  );
}