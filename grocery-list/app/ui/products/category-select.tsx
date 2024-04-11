'use client';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';
import { Listbox } from '@headlessui/react'


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

  let selectedCategory = searchParams.get('category')?.toString() ?? categories[0];

  return (
    <Listbox
      value={selectedCategory}
      onChange={(e) => handleChange(e)}>
      <Listbox.Button>{selectedCategory}</Listbox.Button>
      <Listbox.Options>
        {categories.map((c) => {
                return (
                  <Listbox.Option
                    key={c}
                    value={c}
                    disabled={false}>
                    {c}
                  </Listbox.Option>
                )
              }
          )
        }
      </Listbox.Options>
    </Listbox>
  );
}
