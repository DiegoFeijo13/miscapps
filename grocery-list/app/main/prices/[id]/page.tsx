import { Spacer } from "@nextui-org/spacer"
import {
  fetchProductById
} from '@/app/lib/product-actions';
import { Metadata } from "next";
import { Subtitle, Title } from "@/components/title";
import { PricesBreadcrumbs } from "@/components/prices/breadcrumbs";
import ProductChart from "@/components/prices/chart";
import { fetchChartData } from "@/app/lib/product-list-actions";

export const metadata: Metadata = {
  title: 'Produtos'
}

export default async function Page({ params }: { params: { id: string } }) {
  const id = params.id;
  const product = await fetchProductById(id);
  const prices = await fetchChartData(id);

  return (
    <>
      <PricesBreadcrumbs product_name={product.name}/>
      <Spacer y={4}/>
      <Subtitle text="Evolução de preços"/>
      <Title text={product.name}/>
      <Spacer y={4}/>
      <ProductChart chartData={prices} />      
    </>
  );
}