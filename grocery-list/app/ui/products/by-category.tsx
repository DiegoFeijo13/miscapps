'use client';
import { Product } from "@/app/lib/definitions";
import { Accordion, AccordionItem, Select, SelectItem } from "@nextui-org/react";
import ProductsTable from "./table";


export default function ByCategory({ categories, products }: { categories: string[], products: Product[] }) {

  return (
    <>
      <Accordion
        isCompact
        variant="light">
        {categories.map((c) => {
          const categoryProducts = products.filter((p) => { return p.category == c })
          return (
            <AccordionItem
              key={c}
              aria-label={`Produtos da categoria ${c}`}
              title={c}
              subtitle={`${categoryProducts.length} produtos`}>

              <ProductsTable products={categoryProducts} />

            </AccordionItem>
          )
        })}
      </Accordion>

    </>
  );
}
