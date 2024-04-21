"use client"
import React from 'react';
import { ProductListVM } from '@/app/lib/definitions'
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
  Input
} from '@nextui-org/react';
import { CheckIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';

export default function ToBuyTable({
  products
}: {
  products: ProductListVM[];
}) {
  const [filterValue, setFilterValue] = React.useState("");
  const hasSearchFilter = Boolean(filterValue);

  const renderActions = ((product: ProductListVM) => {
    return (
      <Tooltip content='Comprar'>
        <Button
          isIconOnly
          size='sm'
          color='success'
          href={`/main/lists/${product.list_id}/product-list/${product.product_id}/add`}
          as={Link}
        >
          <CheckIcon className="w-3" />
        </Button>
      </Tooltip>
    );
  });

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

  const topContent = React.useMemo(() => {
    return (
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
      </div>
    );
  }, [
    filterValue,
    onSearchChange,
    products.length,
    hasSearchFilter,
  ]);

  return (
    <Table
      removeWrapper
      isHeaderSticky
      topContent={topContent}
      topContentPlacement='outside'
      aria-label="Tabela de produtos na lista de compra">
      <TableHeader>
        <TableColumn key='prod_name' align='start'>Produto</TableColumn>
        <TableColumn key='actions' align='end'>Ações</TableColumn>
      </TableHeader>
      <TableBody
        emptyContent={"Sem produtos aqui."}>
        {filteredItems.map((p) => (
          <TableRow key={p.product_id}>
            <TableCell>{p.name}</TableCell>
            <TableCell>{renderActions(p)}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
