"use client"
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from "@nextui-org/react";

export function TableRowSkeleton() {
  return (
    <TableRow>
      <TableCell><div className="h-6 w-24 rounded bg-gray-100"></div></TableCell>
      <TableCell><div className="h-6 w-24 rounded bg-gray-100"></div></TableCell>
      <TableCell>
        <div className="h-[38px] w-[38px] rounded bg-gray-100"></div>        
      </TableCell>
    </TableRow>
  );
}

export function TableSkeleton() {
  return (
    <Table>
      <TableHeader>
        <TableColumn>Nome</TableColumn>
        <TableColumn>Data</TableColumn>
        <TableColumn>Ações</TableColumn>
      </TableHeader>
      <TableBody>
        {TableRowSkeleton()}
        {TableRowSkeleton()}
        {TableRowSkeleton()}
        {TableRowSkeleton()}
        {TableRowSkeleton()}
      </TableBody>
    </Table>
  );
}
