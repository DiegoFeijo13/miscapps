"use client"
import {
    Accordion,
    AccordionItem
} from "@nextui-org/react"
import ProductListTable from "./table"
import { ProductListVM } from "@/app/lib/definitions";

export default function BuyList({ products, listId }: { products: ProductListVM[], listId: string}) {
    const categories = products.map((p) => p.category).filter((value, i, a) => a.indexOf(value) === i)
    
    const productsByCategory = (category: string) => {
        return products.filter((p) => p.category === category)
    }
    return (
        <>
            <Accordion
                isCompact
                variant="light"
                defaultExpandedKeys={['toBuy']}>
                {
                    categories.map((c) => {
                        let catProds = productsByCategory(c)
                        return (
                            <AccordionItem
                                key={c}
                                aria-label={`Produtos da categoria ${c}`}
                                title={c}
                                subtitle={`${catProds.length} produtos`}>
                                <ProductListTable productLists={products} category={c} listId={listId}/>
                            </AccordionItem>
                        )


                    })
                }
            </Accordion>

        </>
    );
}