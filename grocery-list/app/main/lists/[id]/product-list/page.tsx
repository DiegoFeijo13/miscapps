import { subtitle, title } from "@/components/primitives"
import BuyList from '@/app/ui/product-list/buy-list';
import { Spacer } from "@nextui-org/react"
import {
  fetchListById,
  getBoughtProducts,
  getListProducts
} from "@/app/lib/list-actions";
import { BuyProductListBreadcrumbs } from "@/app/ui/product-list/breadcrumbs";
import { formatDateToLocal } from "@/app/lib/utils";

export default async function Page({ params }: { params: { id: string } }) {

  const listId = params.id;
  const list = await fetchListById(listId) || { name: '' };
  const productsToBuy = await getListProducts(listId);
  const boughtProducts = await getBoughtProducts(listId)
  return (
    <>
      <BuyProductListBreadcrumbs listName={list.name}/>
      <Spacer y={4} />
      <h1 className={title()}>Itens da lista </h1>
      <h1 className={title({color:'violet'})}>{list.name}</h1>
      <h1 className={subtitle()}>{ list.buy_dt ? `Em ${formatDateToLocal(list.buy_dt)}`: ''}</h1>
      <Spacer y={4} />

      <BuyList boughtProducts={boughtProducts} productsToBuy={productsToBuy} />

    </>
  );
}