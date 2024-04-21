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
  Input
} from '@nextui-org/react';
import { PencilIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';

export default function BoughtTable({
  products
}: {
  products: ProductListEditVM[];
}) {
  const [filterValue, setFilterValue] = React.useState("");
  const hasSearchFilter = Boolean(filterValue);

  const renderActions = ((pl: ProductListEditVM) => {        
      return (
        <Tooltip content='Editar'>
          <Button
            isIconOnly
            size='sm'
            color='default'
            href={`/main/lists/${pl.list_id}/product-list/${pl.id}/edit`}
            as={Link}
          >
            <PencilIcon className="w-3" />
          </Button>
        </Tooltip>
      );
    }  
  );

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

  const onClear = React.useCallback(()=>{
    setFilterValue("")    
  },[])

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
        <TableColumn key='name' align='start'>Produto</TableColumn>
        <TableColumn key='quantity' align='start'>Qtd</TableColumn>
        <TableColumn key='price' align='start'>$</TableColumn>
        <TableColumn key='actions' align='end'>Ações</TableColumn>
      </TableHeader>
      <TableBody
        emptyContent={"Sem produtos aqui."}>
        {filteredItems.map((p) => (
          <TableRow key={p.id}>
            <TableCell>{p.product_name}</TableCell>
            <TableCell>{p.quantity}</TableCell>
            <TableCell>{p.price}</TableCell>
            <TableCell>{renderActions(p)}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
