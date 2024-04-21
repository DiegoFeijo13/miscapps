import { title } from "@/components/primitives"
import BuyList from '@/app/ui/product-list/buy-list';
import { Spacer } from "@nextui-org/react"
import {
  fetchListById,
  getBoughtProducts,
  getListProducts
} from "@/app/lib/list-actions";

export default async function Page({ params }:{params: { id: string }}) {

  const listId = params.id;  
  const list = await fetchListById(listId) || { name: '' };
  const productsToBuy = await getListProducts(listId);
  const boughtProducts = await getBoughtProducts(listId)
  return (
    <div className='mb-2 w-full rounded-md bg-white p-4'>
      <h1 className={title()}>{`Comprando a lista "${list.name}"`}</h1>
      <Spacer y={4} />

      <BuyList boughtProducts={boughtProducts} productsToBuy={productsToBuy} />

    </div>
  );
}