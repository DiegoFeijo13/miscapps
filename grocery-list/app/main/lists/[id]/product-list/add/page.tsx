import { subtitle, title } from "@/components/primitives"
import { Spacer } from "@nextui-org/react"
import {fetchListById} from "@/app/lib/list-actions";
import {fetchProductsNotInList} from "@/app/lib/product-list-actions";
import { AddProductListBreadcrumbs } from "@/components/product-list/breadcrumbs";
import AddList from "@/components/product-list/add-list";

export default async function Page({ params }: { params: { id: string } }) {

  const listId = params.id;
  const list = await fetchListById(listId) || { name: '' };
  const productsToAdd = await fetchProductsNotInList(listId)
  
  return (
    <>
      <AddProductListBreadcrumbs listId={listId}/>
      <Spacer y={4} />
      <div className="w-full flex text-center items-center justify-center">
        <span className={title({ color: 'violet' })}>{list.name}</span>
      </div>
      <div className="w-full flex text-center items-center justify-center mt-4">        
        <span className={subtitle()}>Adicionar Produtos</span>
      </div>

      <Spacer y={4} />
      <AddList products={productsToAdd} listId={listId} />
    </>
  );
}