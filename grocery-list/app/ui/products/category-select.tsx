'use client';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';
import { Select, SelectItem } from "@nextui-org/react";


export default function CategorySelect({ categories }: { categories: string[] }) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleChange = useDebouncedCallback((term) => {    
    const params = new URLSearchParams(searchParams);
    params.set('page', '1');
    if (term) {
      params.set('category', term);
    } else {
      params.delete('category');
    }

    replace(`${pathname}?${params.toString()}`);
  }, 300)

  return (
    <div className='mt-6'>
      <Select
        items={categories}
        label="Categoria"
        placeholder="Selecione uma categoria"        
        onChange={(e) => handleChange(e.target.value)}
      >
        {
          categories.map((c) => {
            return (<SelectItem key={c}>{c}</SelectItem>)
          }
          )
        }
      </Select>
    </div>
  );
}
