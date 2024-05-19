"use client"

import {
  Input,
  Select,
  SelectItem} from "@nextui-org/react";
import { Product } from '@/app/lib/definitions'
import React from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/16/solid";
import ProductCard from "./product-card";


export default function Products({ products }: { products: Product[], categories: string[] }) {
  const categories = Array.from(new Set(products.map((p) => p.category)))
  const [category, setCategory] = React.useState("");

  const [filterValue, setFilterValue] = React.useState("");
  const hasSearchFilter = Boolean(filterValue || category.length > 0);

  const filteredProducts = React.useMemo(() => {
    let filteredItems = [...products];

    if (hasSearchFilter) {
      if (filterValue.length > 0) {
        filteredItems = filteredItems.filter((p) =>
          p.name.toLowerCase().includes(filterValue.toLowerCase())
        );
      }

      if (category.length > 0) {
        filteredItems = filteredItems.filter((p) => p.category == category)
      }
    }

    return filteredItems
  }, [products, filterValue, category]);

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
      <div className="w-full flex gap-4">
        <Input
          isClearable
          className="w-1/2"
          placeholder="Buscar produtos..."
          startContent={<MagnifyingGlassIcon className='w-5' />}
          value={filterValue}
          onClear={onClear}
          onValueChange={onSearchChange}
        />

        <Select
          labelPlacement="inside"
          aria-label="Filtro de Categoria"
          placeholder="Categoria"
          className="w-1/2 mb-4"
          onChange={(e) => setCategory(e.target.value)}
        >
          {categories.map((c) => (
            <SelectItem key={c} value={c}>
              {c}
            </SelectItem>
          ))}
        </Select>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {
          filteredProducts.map((p) => {
            return (
              <ProductCard product={p} key={p.id} />
            )
          })
        }
      </div>


    </div>
  );
}

