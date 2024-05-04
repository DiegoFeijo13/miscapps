"use client"

import {
  Link,
  Input,
  Table,
  TableHeader,
  TableCell,
  TableColumn,
  TableBody,
  TableRow
} from "@nextui-org/react";
import { List } from '@/app/lib/definitions'
import { formatDateToLocal } from "@/app/lib/utils";
import React from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/16/solid";
import { gotoProductList } from "@/app/lib/actions";


export default function ListsTable({
  lists
}: {
  lists: List[],
}) {
  const [filterValue, setFilterValue] = React.useState("");
  const hasSearchFilter = Boolean(filterValue);

  const filteredItems = React.useMemo(() => {
    let filteredLists = [...lists];

    if (hasSearchFilter) {
      filteredLists = filteredLists.filter((l) =>
        l.name.toLowerCase().includes(filterValue.toLowerCase())
      );
    }

    return filteredLists;
  }, [lists, filterValue]);

  const onSearchChange = React.useCallback((value?: string) => {
    if (value) {
      setFilterValue(value);
    } else {
      setFilterValue("");
    }
  }, []);

  const onClear = React.useCallback(() => {
    setFilterValue("")
  }, [])


  return (
    <div>
      <div className="flex flex-col gap-4">
        <Input
          isClearable
          className="w-full mb-4"
          placeholder="Buscar listas..."
          startContent={<MagnifyingGlassIcon className='w-5' />}
          value={filterValue}
          onClear={() => onClear()}
          onValueChange={onSearchChange}
        />
      </div>
      {
        <Table
          aria-label="Tabela de Listas"
          removeWrapper
          hideHeader
          onRowAction={(key) => gotoProductList(`${key}`)}
          className="table-auto"
        >
          <TableHeader>
            <TableColumn>LISTA</TableColumn>
            <TableColumn>{""}</TableColumn>
          </TableHeader>
          <TableBody
            emptyContent={"Sem listas para exibir."}
          >
            {
              filteredItems.map((l) => {
                return (
                  <TableRow key={l.id}>
                    <TableCell className="w-full">
                      <ListCard list={l} />
                    </TableCell>
                    <TableCell>
                      <Link
                        href={`/main/lists/${l.id}/edit`}
                        size="sm"

                      >
                        Editar
                      </Link>
                    </TableCell>
                  </TableRow>
                )
              })
            }
          </TableBody>

        </Table>


      }
    </div>
  );
}

function ListCard({ list }: { list: List }) {
  return (
    <div className="flex flex-col gap-1 items-start justify-center">
      <h4 className="text-small font-semibold leading-none text-default-600">{list.name}</h4>
      <h5 className="text-small tracking-tight text-default-400">{formatDateToLocal(list.buy_dt)}</h5>
    </div>
  )
}
