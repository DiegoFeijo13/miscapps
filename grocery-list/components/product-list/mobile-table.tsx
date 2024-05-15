"use client"

import { ProductListVM } from '@/app/lib/definitions'
import React from "react";
import ProductListCard from "./product-list-card";


export default function ProductListMobileTable({ productLists }: { productLists: ProductListVM[] }) {
  
  return (
    <div>
      {
        productLists.map((pl) => {
          return (
            <ProductListCard product={pl} key={pl.productList_id} />
          )
        })
      }
    </div>
  );
}
