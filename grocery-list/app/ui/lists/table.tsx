"use client"

import {
  Table, 
  TableHeader, 
  TableColumn, 
  TableBody, 
  TableRow, 
  TableCell  
} from "@nextui-org/react";
import { ActionButtons } from '@/app/ui/lists/buttons';
import { List } from '@/app/lib/definitions'

export default async function ListsTable({
  lists
}: {
  lists: List[];
}) {  
  return (

    <Table>
      <TableHeader>
        <TableColumn width={'50%'} maxWidth={'50%'}>Nome</TableColumn>
        <TableColumn width={'30%'}>Data</TableColumn>
        <TableColumn width={'20%'} align="end">Ações</TableColumn>
      </TableHeader>
      <TableBody>
        {lists?.map((l) => (
          <TableRow key={l.id}>
            <TableCell>{l.name}</TableCell>
            <TableCell>{l.date}</TableCell>
            <TableCell>
              <ActionButtons id={l.id} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
