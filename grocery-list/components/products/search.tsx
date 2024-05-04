import { Product } from "@/app/lib/definitions";
import { MagnifyingGlassIcon } from "@heroicons/react/16/solid";
import { Input, Select, SelectItem } from "@nextui-org/react";
import React from "react";
import { FC } from "react";

export interface SearchProps {
    products: Product[],
    setFilteredProducts: ((products: Product[]) => void)
}

export const Search: FC<SearchProps> = ({ products, setFilteredProducts }) => {
    const categories = Array.from(new Set(products.map((p) => p.category)))

    const [filterValue, setFilterValue] = React.useState("");
    const [category, setCategory] = React.useState("");
    const hasSearchFilter = Boolean(filterValue || category.length > 0);

    React.useMemo(() => {
        let filteredProducts = [...products];

        if (hasSearchFilter) {
            if (filterValue.length > 0) {
                filteredProducts = filteredProducts.filter((p) =>
                    p.name.toLowerCase().includes(filterValue.toLowerCase())
                );
            }

            if (category.length > 0) {
                filteredProducts = filteredProducts.filter((p) => p.category == category)
            }
        }

        setFilteredProducts(filteredProducts);
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
    )
}