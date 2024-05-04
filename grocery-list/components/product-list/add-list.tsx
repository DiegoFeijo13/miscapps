"use client"
import {
    Accordion,
    AccordionItem,
    Button,
    Link,
    Spacer,
    Spinner,
    Table,
    TableBody,
    TableCell,
    TableColumn,
    TableHeader,
    TableRow,
    button
} from "@nextui-org/react"
import { Product } from "@/app/lib/definitions";
import { addAllProductsToList } from "@/app/lib/product-list-actions";
import { PlusIcon } from "@heroicons/react/16/solid";
import React from "react";

export default function AddList({ products, listId }: { products: Product[], listId: string }) {
    const categories = products.map((p) => p.category).filter((value, i, a) => a.indexOf(value) === i)

    const productsByCategory = (category: string) => {
        return products.filter((p) => p.category === category)
    }

    if (products.length <= 0) {
        return (
            <>
                <div className="w-full flex text-center items-center justify-center">
                    <span>Ops. Não há mais produtos para adicionar.</span>
                </div>
                <Spacer y={4} />
                <div className="w-full flex text-center items-center justify-center">
                    <span>Você pode:</span>
                </div>
                <div className="w-full">
                    <ul>
                        <li className="py-2">
                            <Button
                                as={Link}
                                size="sm"
                                color="primary"
                                className="w-full"
                                variant='flat'
                                href="/main/products">
                                Criar mais produtos
                            </Button>
                        </li>
                        <li className="py-2">
                            <Button
                                as={Link}
                                size="sm"
                                color="primary"
                                className="w-full"
                                variant='flat'
                                href={`/main/lists/${listId}/product-list`}>
                                Comprar os produtos já adicionados
                            </Button>
                        </li>
                    </ul>

                </div>
            </>
        )
    }
    return (
        <>
            <Accordion
                isCompact
                variant="light"
                defaultExpandedKeys={['toBuy']}>
                {
                    categories.map((c) => {
                        let catProds = productsByCategory(c)
                        return (
                            <AccordionItem
                                key={c}
                                aria-label={`Produtos da categoria ${c}`}
                                title={c}
                                subtitle={`${catProds.length} produtos`}>
                                <ProductListTable products={catProds} listId={listId} />
                            </AccordionItem>
                        )


                    })
                }
            </Accordion>

        </>
    );
}

function ProductListTable({ products, listId }: { products: Product[], listId: string }) {
    const [isLoading, setIsLoading] = React.useState(false);
    const [selectedKeys, setSelectedKeys] = React.useState<Set<React.Key>>(new Set([]));


    const addSelected = () => {
        let ids: string[] = [];

        if (selectedKeys.size === undefined) {
            ids = products.map((p) => p.id)
        }

        if (selectedKeys.size > 0) {
            
            selectedKeys.forEach((k) => ids.push(k.toString()))
        }

        if (ids.length > 0) {
            setIsLoading(true)
            console.log(ids)
            addAllProductsToList(listId, ids)
                .then(() => setIsLoading(false))
        }
    }

    return (
        <>

            <Button
                size="sm"
                color="primary"
                onPress={addSelected}
                variant='flat'
                className='w-full mb-4'
                isDisabled={selectedKeys.size === 0}
                startContent={<PlusIcon className="w-5" />}
            >
                {selectedKeys.size === undefined ? 'Adicionar todos os produtos' : 'Adicionar produtos selecionados'}
            </Button>

            <Table
                aria-label="Tabela de Compras"
                selectionMode="multiple"                
                isCompact
                removeWrapper
                onSelectionChange={(keys) => setSelectedKeys(new Set(keys))}
            >
                <TableHeader>
                    <TableColumn>PRODUTO</TableColumn>
                </TableHeader>
                <TableBody
                    emptyContent={"Sem produtos para exibir."}
                    items={products}
                    isLoading={isLoading}
                    loadingContent={<Spinner />}
                >
                    {(item) => (
                        <TableRow key={item.id}>
                            <TableCell>{item.name}</TableCell>
                        </TableRow>
                    )}
                </TableBody>

            </Table>

        </>
    );
}