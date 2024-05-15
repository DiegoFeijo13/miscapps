"use client"
import {
    Tab,
    Tabs
} from "@nextui-org/react"
import ProductListTable from "./table"
import { ProductListVM } from "@/app/lib/definitions";

export default function BuyList({ products, listId }: { products: ProductListVM[], listId: string }) {

    if (products.length == 0)
        return "";

    const categories = products.map((p) => p.category).filter((value, i, a) => a.indexOf(value) === i)

    return (
        <Tabs aria-label="Categories" fullWidth>
            {
                categories.map((c) => {
                    return (
                        <Tab key={c} title={c} >
                            <ProductListTable productLists={products} category={c} listId={listId} />
                        </Tab>
                    )
                })
            }
        </Tabs>
    );
}