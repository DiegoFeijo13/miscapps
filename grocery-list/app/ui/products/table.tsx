"use client"

import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell
} from "@nextui-org/react";
import { ActionButtons } from '@/app/ui/products/buttons';
import { Product } from '@/app/lib/definitions'


export default async function ProductsTable({ products }: { products: Product[] }) {

  return (
    <Table>
      <TableHeader>
        <TableColumn width={'80%'}>Produto</TableColumn>
        <TableColumn>Ações</TableColumn>
      </TableHeader>
      <TableBody
        emptyContent={"Sem produtos aqui."}>
        {products?.map((p) => (
          <TableRow key={p.id}>
            <TableCell>{p.name}</TableCell>
            <TableCell>
              <ActionButtons id={p.id} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
