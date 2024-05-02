"use client"
import { ProductListVM } from "@/app/lib/definitions";
import { formatCurrency } from "@/app/lib/utils";
import { Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from "@nextui-org/react";

export default function Total({ products }: { products: ProductListVM[] }) {
    const add = function (partial: number, product: ProductListVM) {
        let quantity = product?.quantity ?? 0;
        let price = product?.price ?? 0;
        return partial + (quantity * price);
    }

    const totalProducts = products.length;
    const amount = products.reduce(add, 0)
    const bought = products.filter((p) => p.done).length
    const boughtAmount = products.filter((p) => p.done).reduce(add,0)

    return (
        <Table removeWrapper>
            <TableHeader>
                <TableColumn className="w-1/8"> </TableColumn>
                <TableColumn className="text-center">Itens</TableColumn>
                <TableColumn className="text-center">Total</TableColumn>
            </TableHeader>
            <TableBody>
                <TableRow>
                    <TableCell className="w-1/8">Na lista</TableCell>
                    <TableCell className="w-4/8 text-center">{totalProducts}</TableCell>
                    <TableCell className="w-3/8 text-center">{formatCurrency(amount)}</TableCell>
                </TableRow>
                <TableRow>
                    <TableCell className="w-1/8">Comprados</TableCell>
                    <TableCell className="w-4/8 text-center">{bought}</TableCell>
                    <TableCell className="w-3/8 text-center">{formatCurrency(boughtAmount)}</TableCell>
                </TableRow>
            </TableBody>
        </Table>
    );
}