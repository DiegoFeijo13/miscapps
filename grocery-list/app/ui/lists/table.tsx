"use client"

import {
  Card,
  CardHeader,
  Button,
  Link,
  Spacer,
  Input
} from "@nextui-org/react";
import { List } from '@/app/lib/definitions'
import { formatDateToLocal } from "@/app/lib/utils";
import React from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/16/solid";




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

        filteredItems.map((l) => {
          return (<TableItem key={l.id} list={l} />)
        })
      }
    </div>
  );
}

function TableItem({ list }: { list: List }) {
  return (
    <Card
      className="w-full mb-4"
      as={Link}
      href={`/main/lists/${list.id}/product-list`}
    >
      <CardHeader className="justify-between">
        <div className="flex gap-5">
          <div className="flex flex-col gap-1 items-start justify-center">
            <h4 className="text-small font-semibold leading-none text-default-600">{list.name}</h4>
            <h5 className="text-small tracking-tight text-default-400">{formatDateToLocal(list.buy_dt)}</h5>
          </div>
        </div>
        <Button
          as={Link}
          href={`/main/lists/${list.id}/edit`}
          color="primary"
          radius="full"
          size="sm"
          variant="solid"
        >
          Editar
        </Button>
      </CardHeader>
    </Card>
  )
}
