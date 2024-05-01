import { subtitle, title } from "@/components/primitives"
import { Spacer } from "@nextui-org/react"
import {
  fetchListById,
  getBoughtProducts} from "@/app/lib/list-actions";
import { BuyProductListBreadcrumbs } from "@/components/product-list/breadcrumbs";
import { formatDateToLocal } from "@/app/lib/utils";
import BuyList from "@/components/product-list/buy-list";

export default async function Page({ params }: { params: { id: string } }) {

  const listId = params.id;
  const list = await fetchListById(listId) || { name: '' };  
  const boughtProducts = await getBoughtProducts(listId)
  return (
    <>
      <BuyProductListBreadcrumbs/>
      <Spacer y={4} />      
      <h1 className={title({color:'violet'})}>{list.name}</h1>
      <h1 className={subtitle()}>{ list.buy_dt ? `Em ${formatDateToLocal(list.buy_dt)}`: ''}</h1>
      <Spacer y={4} />
      <BuyList products={boughtProducts} />
    </>
  );
}