"use client"

import {
  Card,
  CardHeader,
  Link,
  Input
} from "@nextui-org/react";
import { Product } from '@/app/lib/definitions'
import { MagnifyingGlassIcon } from "@heroicons/react/16/solid";
import React from "react";


export default function ProductsTable({ products }: { products: Product[] }) {

  const [filterValue, setFilterValue] = React.useState("");
  const hasSearchFilter = Boolean(filterValue);

  const filteredItems = React.useMemo(() => {
    let filteredProducts = [...products];

    if (hasSearchFilter) {
      filteredProducts = filteredProducts.filter((p) =>
        p.name.toLowerCase().includes(filterValue.toLowerCase())
      );
    }

    return filteredProducts;
  }, [products, filterValue]);

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
          placeholder="Buscar produtos..."
          startContent={<MagnifyingGlassIcon className='w-5' />}
          value={filterValue}
          onClear={() => onClear()}
          onValueChange={onSearchChange}
        />
      </div>
      {

        filteredItems.map((p) => {
          return (<TableItem key={p.id} product={p} />)
        })
      }
    </div>
  );
}

function TableItem({ product }: { product: Product }) {
  return (
    <Card
      className="w-full mb-4"
      as={Link}
      href={`/main/products/${product.id}/edit`}
    >
      <CardHeader className="justify-center">
        <h4 className="text-small font-semibold leading-none text-default-600">{product.name}</h4>
      </CardHeader>
    </Card>
  )
}