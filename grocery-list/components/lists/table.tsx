"use client"

import {
  Link,
  Input,
  Table,
  TableHeader,
  TableCell,
  TableColumn,
  TableBody,
  TableRow,
  ButtonGroup,
  Button
} from "@nextui-org/react";
import { ListVM } from '@/app/lib/definitions'
import { formatDateToLocal, formatNumber } from "@/app/lib/utils";
import React from "react";
import { MagnifyingGlassIcon, PencilIcon, ShoppingCartIcon, TrashIcon } from "@heroicons/react/16/solid";
import {remove} from "@/app/lib/list-actions"

export default function ListsTable({lists}: {lists: ListVM[]}) {
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
        <Table aria-label="Tabela de Listas">
          <TableHeader>
            <TableColumn>LISTA</TableColumn>
            <TableColumn>DATA</TableColumn>
            <TableColumn>ITENS</TableColumn>
            <TableColumn className="text-center">TOTAL R$</TableColumn>
            <TableColumn className="text-center">AÇÕES</TableColumn>
          </TableHeader>
          <TableBody
            emptyContent={"Sem listas para exibir."}
          >
            {
              filteredItems.map((l) => {
                return (
                  <TableRow key={l.id}>
                    <TableCell>{l.name}</TableCell>
                    <TableCell>{formatDateToLocal(l.buy_dt)}</TableCell>
                    <TableCell className="text-center">{l.items}</TableCell>
                    <TableCell className="text-right">{formatNumber(l.total)}</TableCell>
                    <TableCell className="text-center w-1/5">
                      <ButtonGroup>
                        <Button
                          as={Link}
                          isIconOnly
                          aria-label="Comprar"
                          color="primary"
                          href={`/main/lists/${l.id}/product-list`}
                          size="sm"                          
                          variant="flat"
                        >
                          <ShoppingCartIcon className="w-5" />
                        </Button>
                        <Button
                          as={Link}
                          isIconOnly
                          aria-label="Editar"
                          href={`/main/lists/${l.id}/edit`}
                          size="sm"
                          variant="flat"
                        >
                          <PencilIcon className="w-5" />
                        </Button>
                        <Button                          
                          isIconOnly
                          aria-label="Excluir"                          
                          size="sm"
                          variant="flat"
                          color="danger"
                          onPress={(e) => remove(l.id)}
                        >
                          <TrashIcon className="w-5" />
                        </Button>
                      </ButtonGroup>

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
