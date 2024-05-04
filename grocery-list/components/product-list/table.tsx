"use client"

import {
  Table,
  TableHeader,
  TableCell,
  TableColumn,
  TableBody,
  TableRow,
  Checkbox,
  Input
} from "@nextui-org/react";
import { ProductListVM } from '@/app/lib/definitions'
import { formatCurrency } from "@/app/lib/utils";
import React from "react";
import { gotoProductListEdit } from "@/app/lib/actions";
import { toggleDone } from "@/app/lib/product-list-actions";


export default function ProductListTable({ productLists, category, listId }: { productLists: ProductListVM[], category: string, listId: string }) {

  const toggleIsDone = (e: any, productList_id: string | null) => {
    if(!productList_id)
      return;

    toggleDone(productList_id, e.target.checked)
  }

  const gotoEditProductList = (id: string) => {
    gotoProductListEdit(listId, id);
  }

  const productsByCategory = (category: string) => {
    return productLists
      .filter((p) => p.category === category)
      .map((p) => {
        return ({ name: p.product_name, category: p.category, id: p.product_id })
      })
  }

  const productListsByCategory = (category: string) => {    
    return productLists
      .filter((p) => p.category === category)      
  }

  const products = productsByCategory(category);


  return (
    <>      
      <Table
        aria-label="Tabela de Compras"
        removeWrapper
        className="table-auto"
        onRowAction={(key) => gotoEditProductList(key.toString())}
      >
        <TableHeader>
          <TableColumn>{''}</TableColumn>
          <TableColumn align="start">PRODUTO</TableColumn>
          <TableColumn>QTD</TableColumn>
          <TableColumn>R$</TableColumn>
        </TableHeader>
        <TableBody
          emptyContent={"Sem produtos para exibir."}
          items={productListsByCategory(category)}
        >
          {(item) => (
            <TableRow key={item.productList_id}>
              <TableCell>
                <Checkbox
                  name="done"
                  defaultSelected={item.done}
                  onChange={(e) => toggleIsDone(e, item.productList_id)} />
              </TableCell>
              <TableCell>{item.product_name}</TableCell>
              <TableCell>{item.quantity}</TableCell>
              <TableCell>{formatCurrency(item.price ?? 0)}</TableCell>
            </TableRow>
          )}
        </TableBody>

      </Table>
    </>


  );
}
