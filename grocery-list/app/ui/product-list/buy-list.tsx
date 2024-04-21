"use client"
import {
    Accordion,
    AccordionItem
} from "@nextui-org/react"
import ToBuyTable from "./to-buy-table"
import BoughtTable from "./bought-table"
import { TableSkeleton, BoughtTableSkeleton } from "./skeletons"
import { Suspense } from "react";
import { ProductListEditVM, ProductListVM } from "@/app/lib/definitions";

export default function BuyList(
    { productsToBuy, boughtProducts }:
        { productsToBuy: ProductListVM[], boughtProducts: ProductListEditVM[] }) {

    return (
        <>
            <Accordion
                isCompact
                variant="light"
                defaultExpandedKeys={['toBuy']}>
                <AccordionItem
                    key='toBuy'
                    aria-label="Produtos para comprar"
                    title="Comprar"
                    subtitle={`${productsToBuy.length} produtos`}>
                    <Suspense fallback={<TableSkeleton />}>
                        <ToBuyTable products={productsToBuy} />
                    </Suspense>
                </AccordionItem>
                <AccordionItem
                    key='bought'
                    aria-label="Produtos comprados"
                    title="Comprados"
                    subtitle={`${boughtProducts.length} produtos`}>
                    <Suspense fallback={<BoughtTableSkeleton />}>
                        <BoughtTable products={boughtProducts} />
                    </Suspense>
                </AccordionItem>
            </Accordion>

        </>
    );
}