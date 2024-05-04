"use client"

import {
  Button,
  Link,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow
} from "@nextui-org/react";
import { Product } from '@/app/lib/definitions'
import React from "react";
import { Search } from "./search";
import { gotoProductEdit } from "@/app/lib/actions";


export default function ProductsTable({ products }: { products: Product[], categories: string[] }) {
  const [filteredProducts, setFilteredProducts] = React.useState(products);

  return (
    <div>
      <Search
        products={products}
        setFilteredProducts={setFilteredProducts}
      />

      <Table
        aria-label="Tabela de Produtos"
        isCompact
        removeWrapper        
        className="table-auto"
      >
        <TableHeader>
          <TableColumn>CATEGORIA</TableColumn>
          <TableColumn>PRODUTO</TableColumn>
        </TableHeader>
        <TableBody
          emptyContent={"Sem produtos para exibir."}
        >
          {
            filteredProducts.map((p) => {
              return (
                <TableRow key={p.id}>
                  <TableCell className="w-1/4">{p.category}</TableCell>
                  <TableCell className="w-3/4 text-left">
                    <Button
                      as={Link}
                      className="w-full"
                      variant="light"
                      onPress={() => gotoProductEdit(p.id)}
                    >{p.name}</Button>
                  </TableCell>
                </TableRow>
              )
            })
          }
        </TableBody>
      </Table>

    </div>
  );
}

