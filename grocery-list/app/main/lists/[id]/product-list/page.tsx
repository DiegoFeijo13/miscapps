import { Spacer } from "@nextui-org/react"
import {
  fetchListById,
  getBoughtProducts
} from "@/app/lib/list-actions";
import { BuyProductListBreadcrumbs } from "@/components/product-list/breadcrumbs";
import { formatDateToLocal } from "@/app/lib/utils";
import BuyList from "@/components/product-list/buy-list";
import Total from "@/components/product-list/list-total";
import { CalendarIcon } from "@heroicons/react/16/solid";
import { CreateButton } from "@/components/buttons";
import { Title, Subtitle } from "@/components/title";

export default async function Page({ params }: { params: { id: string } }) {

  const listId = params.id;
  const list = await fetchListById(listId) || { name: '' };
  const products = await getBoughtProducts(listId)
  return (
    <>
      <BuyProductListBreadcrumbs />
      <Spacer y={4} />
      <Title text={list.name} />
      <Subtitle 
        startContent={<CalendarIcon className="w-5 mr-2" />}
        text={list.buy_dt ? `${formatDateToLocal(list.buy_dt)}` : ''} 
        />
      <Spacer y={4} />
      <CreateButton href={`/main/lists/${listId}/product-list/add`} text="Adicionar Produtos" />
      <Spacer y={4} />
      <Total products={products} />
      <Spacer y={4} />
      <BuyList products={products} listId={listId} />
    </>
  );
}