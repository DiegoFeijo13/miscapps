"use client"

import {
  Input
} from "@nextui-org/react";
import { ListVM } from '@/app/lib/definitions'
import React from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/16/solid";
import ListCard from "./list-card";

export default function ListsCards({ lists }: { lists: ListVM[] }) {
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
      <div className="flex gap-4">
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
      <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
        {filteredItems.map((l) => {
          return (
            <ListCard list={l} key={l.id} />
          )
        })
        }
      </div>
    </div>
  );
}

