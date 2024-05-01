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


export default function ProductListTable({
  productLists
}: {
  productLists: ProductListVM[],
}) {
  const selectedProductListIds = productLists.filter((pl) => pl.productList_id).map((pl) => pl.product_id)

  const [selectedKeys, setSelectedKeys] = React.useState(new Set(selectedProductListIds));

  const onRowAction = (key: any) => {
    console.log(key.target)
    if (!key)
      return

    if (selectedKeys.has(key))
      console.log(key)
  }

  const gotoEditProductList = (id: string) => {
    let productList = productLists.find((pl) => pl.product_id === id)
    if (productList?.productList_id)
      gotoProductListEdit(productList.list_id, productList.productList_id);
  }


  return (
    <Table
      aria-label="Tabela de Compras"
      removeWrapper      
      className="table-auto"
    >
      <TableHeader>
        <TableColumn>{''}</TableColumn>
        <TableColumn align="start">PRODUTO</TableColumn>
        <TableColumn>QTD</TableColumn>
        <TableColumn>R$</TableColumn>
      </TableHeader>
      <TableBody
        emptyContent={"Sem produtos para exibir."}
        items={productLists}
      >
        {(item) => (
          <TableRow key={item.product_id}>
            <TableCell>
              <Checkbox  
                name="done"
                defaultChecked={item.done}
                onChange={(e) => onRowAction(e)}/>
            </TableCell>
            <TableCell>{item.product_name}</TableCell>
            <TableCell>{item.quantity}</TableCell>
            <TableCell>{formatCurrency(item.price ?? 0)}</TableCell>
          </TableRow>
        )}
      </TableBody>

    </Table>



  );
}
