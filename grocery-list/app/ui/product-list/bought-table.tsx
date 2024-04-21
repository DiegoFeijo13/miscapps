"use client"
import React from 'react';
import { ProductListEditVM } from '@/app/lib/definitions'
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableCell,
  TableColumn,
  Button,
  Link,
  Tooltip,
  Input,
  Card,
  CardHeader,
  Spacer
} from '@nextui-org/react';
import { PencilIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { formatCurrency } from '@/app/lib/utils';

export default function BoughtTable({
  products
}: {
  products: ProductListEditVM[];
}) {
  const [filterValue, setFilterValue] = React.useState("");
  const hasSearchFilter = Boolean(filterValue);

  const filteredItems = React.useMemo(() => {
    let filteredProducts = [...products];

    if (hasSearchFilter) {
      filteredProducts = filteredProducts.filter((p) =>
        p.product_name.toLowerCase().includes(filterValue.toLowerCase()),
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
            className="w-full sm:max-w-[44%]"
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
              <TableItem pl={p} />
              <Spacer y={4} />
            </>
          )
        }
        )
      }


    </>
  )
}

function TableItem({ pl }: { pl: ProductListEditVM }) {
  return (
    <Card
      className="w-full"
      as={Link}
      href={`/main/lists/${pl.list_id}/product-list/${pl.id}/edit`}
    >
      <CardHeader className="justify-between">
        <div className="flex gap-5">
          <div className="flex flex-col gap-1 items-start justify-center">
            <h4 className="text-small font-semibold leading-none text-default-600">{pl.product_name}</h4>
            <h5 className="text-small tracking-tight text-default-400">{pl.category}</h5>
          </div>
        </div>
        <h5 className="text-small tracking-tight text-default-400">{pl.quantity}</h5>
        <h5 className="text-small tracking-tight text-default-400">{formatCurrency(pl.price)}</h5>
      </CardHeader>
    </Card>
  )
}