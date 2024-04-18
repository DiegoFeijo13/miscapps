'use client'

import React from 'react';
import {
  PlusIcon
} from '@heroicons/react/24/outline';
import {
  Button,
  Spacer,
  Autocomplete,
  AutocompleteItem,
  AutocompleteSection
} from '@nextui-org/react'
import { addProduct } from '@/app/lib/product-list-actions';
import { useFormState } from 'react-dom';
import { Product } from '@/app/lib/definitions';

export default function AddProductForm({
  products,
  listId
}: {
  products: Product[],
  listId: string
}) {
  const categories = Array.from(new Set(products.map(p => p.category)));
  const headingClasses = "flex w-full sticky top-1 z-20 py-1.5 px-2 bg-default-100 shadow-small rounded-small";


  const productsByCategory = (category: string) => {
    let productsByCategory: { id: string, name: string }[] = [];

    products.forEach(p => {
      if (p.category == category)
        productsByCategory.push(p);
    });

    return (
      productsByCategory.map((p) => {
        return (<AutocompleteItem key={p.id}>{p.name}</AutocompleteItem>)
      })
    )
  }

  const [selectedKey, setSelectedKey] = React.useState<React.Key | null>('');

  const onSelectionChange = (key: React.Key) => { setSelectedKey(key) };

  const addProductAction = (e: any) => { addProduct(listId, selectedKey?.toString() ?? '') };

  return (
    <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
      <Autocomplete
        label="Produto"
        placeholder="Selecione um produto"
        name='product_id'
        onSelectionChange={onSelectionChange}
      >
        {
          categories.map(c => {
            return (
              <AutocompleteSection title={c} classNames={{ heading: headingClasses }}>
                {
                  productsByCategory(c)
                }
              </AutocompleteSection>
            )
          })
        }
      </Autocomplete>

      {/* <Spacer x={4} /> */}

      <Button
        isIconOnly
        color='primary'
        onPress={(e) => addProductAction(e)}
      >
        <PlusIcon className="w-5" />
      </Button>
    </div>
  );
}


