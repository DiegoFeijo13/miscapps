'use client';

import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';
import { Input } from '@nextui-org/react'

export default function Search({ placeholder }: { placeholder: string }) {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();

    const handleSearch = useDebouncedCallback((term) => {
        const params = new URLSearchParams(searchParams);
        if (term) {
            params.set('query', term);
        } else {
            params.delete('query');
        }

        replace(`${pathname}?${params.toString()}`);
    }, 300)

    return (
        <Input
            placeholder={placeholder}
            onChange={(e) => {
                handleSearch(e.target.value)
            }}
            defaultValue={searchParams.get('query')?.toString()}
            startContent={
                <MagnifyingGlassIcon
                    className="w-6 text-gray-500 peer-focus:text-gray-900"
                />
            } />
    );
}
