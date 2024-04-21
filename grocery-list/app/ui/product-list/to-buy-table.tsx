"use client"
import React from 'react';
import { ProductListVM } from '@/app/lib/definitions'
import {
  Link,
  Input,
  Card,
  CardHeader,
  Spacer
} from '@nextui-org/react';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

export default function ToBuyTable({
  products
}: {
  products: ProductListVM[];
}) {
  const [filterValue, setFilterValue] = React.useState("");
  const hasSearchFilter = Boolean(filterValue);

  const filteredItems = React.useMemo(() => {
    let filteredProducts = [...products];

    if (hasSearchFilter) {
      filteredProducts = filteredProducts.filter((p) =>
        p.name.toLowerCase().includes(filterValue.toLowerCase()),
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
    <>
      {products.length > 0 ?
        <div className="flex flex-col gap-4">
          <Input
            isClearable
            className="w-full"
            placeholder="Buscar produtos..."
            startContent={<MagnifyingGlassIcon className='w-5' />}
            value={filterValue}
            onClear={() => onClear()}
            onValueChange={onSearchChange}
          />
        </div> : ''}
      <Spacer y={4} />


      {
        filteredItems.map((p) => {
          return (
            <>
              <TableItem key={p.product_id} product={p} />
              <Spacer y={4} />
            </>
          )
        }
        )
      }


    </>
  );
}

function TableItem({ product }: { product: ProductListVM }) {
  return (
    <Card      
      className="w-full"
      as={Link}
      href={`/main/lists/${product.list_id}/product-list/${product.product_id}/add`}
    >
      <CardHeader className="justify-between">
        <div className="flex gap-5">
          <div className="flex flex-col gap-1 items-start justify-center">
            <h4 className="text-small font-semibold leading-none text-default-600">{product.name}</h4>
          </div>
        </div>
        <h5 className="text-small tracking-tight text-default-400">{product.category}</h5>
      </CardHeader>
    </Card>
  )
}
