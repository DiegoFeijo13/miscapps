"use client"
import {
    Tab,
    Tabs
} from "@nextui-org/react"
import ProductListTable from "./table"
import ProductListMobileTable from "./mobile-table"
import { ProductListVM } from "@/app/lib/definitions";

export default function BuyList({ products, listId }: { products: ProductListVM[], listId: string }) {

    if (products.length == 0)
        return "";

    const categories = products.map((p) => p.category).filter((value, i, a) => a.indexOf(value) === i)

    const productListsByCategory = (category: string) => {
        return products
          .filter((p) => p.category === category)
          .sort((a, b) => b.done === a.done ? 0 : b.done ? -1 : 1)
      }

    return (
        <Tabs aria-label="Categories" fullWidth>
            {
                categories.map((c) => {
                    return (
                        <Tab key={c} title={c} >
                            <div className='hidden md:inline-block w-full'>
                                <ProductListTable productLists={products} category={c} listId={listId} />
                            </div>
                            <div className='md:hidden'>                                
                                <ProductListMobileTable productLists={productListsByCategory(c)} />
                            </div>
                        </Tab>
                    )
                })
            }
        </Tabs>
    );
}