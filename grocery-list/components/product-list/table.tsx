"use client"

import {
  Table,
  TableHeader,
  TableCell,
  TableColumn,
  TableBody,
  TableRow,
  Checkbox,
  Input,
  Button
} from "@nextui-org/react";
import { ProductListVM } from '@/app/lib/definitions'
import { formatNumber, formatNumberToLocaleString } from "@/app/lib/utils";
import React from "react";
import { toggleDone, updateQuantity, updatePrice, remove } from "@/app/lib/product-list-actions";
import { TrashIcon } from "@heroicons/react/16/solid";


export default function ProductListTable({ productLists, category, listId }: { productLists: ProductListVM[], category: string, listId: string }) {

  const toggleIsDone = (e: any, productList_id: string | null) => {
    if (!productList_id)
      return;

    toggleDone(productList_id, e.target.checked)
  }

  const updateQuantityEvent = (value: string, productList_id: string | null) => {
    if (!productList_id)
      return;

    let quantity = parseFloat(value);

    if (!quantity || quantity <= 0)
      return;

    updateQuantity(productList_id, quantity)
  }

  const updatePriceEvent = (value: string, productList_id: string | null) => {
    if (!productList_id)
      return;

    let quantity = parseFloat(value);

    if (!quantity || quantity <= 0)
      return;

    updatePrice(productList_id, quantity)
  }

  const productListsByCategory = (category: string) => {
    return productLists
      .filter((p) => p.category === category)
      .sort((a, b) => b.done === a.done ? 0 : b.done ? -1 : 1)
  }

  return (
    <>
      <Table
        aria-label="Tabela de Compras"        
        className="table-auto"      
      >
        <TableHeader>
          <TableColumn key='done'>{''}</TableColumn>
          <TableColumn key='product' align="start">PRODUTO</TableColumn>
          <TableColumn key='quantity'>QTD</TableColumn>
          <TableColumn key='price' className="text-center">R$</TableColumn>
          <TableColumn key='actions' className="text-center">AÇÕES</TableColumn>
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
              <TableCell className="w-1/5">
                <Input
                  type="number"
                  label="Quantidade"
                  aria-label="Quantidade"
                  defaultValue={item.quantity?.toString()}
                  onValueChange={(value) => updateQuantityEvent(value, item.productList_id)}
                  labelPlacement="inside"
                  size="sm" />
              </TableCell>
              <TableCell className="text-right w-1/5">
                <Input
                  type="number"
                  label="Preço"
                  aria-label="Preço"
                  defaultValue={formatNumberToLocaleString(item.price ?? 0)}
                  onValueChange={(value) => updatePriceEvent(value, item.productList_id)}
                  labelPlacement="inside"
                  size="sm" 
                  className="text-right"/>
              </TableCell>
              <TableCell className="text-right w-1/5">
                <Button
                  isIconOnly
                  color="danger"
                  variant="light"
                  onPress={(e) => remove(item.productList_id ?? "")}
                  >
                  <TrashIcon className="w-5" />
                </Button>
              </TableCell>
            </TableRow>
          )}
        </TableBody>

      </Table>
    </>


  );
}
