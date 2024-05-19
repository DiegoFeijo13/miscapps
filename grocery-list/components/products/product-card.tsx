import { Product } from "@/app/lib/definitions";
import { remove } from "@/app/lib/product-actions";
import { EllipsisVerticalIcon } from "@heroicons/react/16/solid";
import { Card, CardHeader, Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Spacer } from "@nextui-org/react";
import Link from "next/link";

export default function ProductCard({ product }: { product: Product }) {
  return (
    <Card className="mb-4">
      <CardHeader className="justify-between">
        <div className="flex flex-col gap-1 items-start justify-center">
          <p className="text-lg font-semibold">{product.name}</p>
          <p className="font-semibold text-default-400 text-small">{product.category}</p>
        </div>
        <Spacer x={4} />
        <div className="flex flex-col gap-1 items-end justify-center">
          <div className="relative flex justify-end items-center gap-2">
            <Dropdown>
              <DropdownTrigger>
                <Button isIconOnly size="sm" variant="light">
                  <EllipsisVerticalIcon className="w-5" />
                </Button>
              </DropdownTrigger>
              <DropdownMenu>
                <DropdownItem
                  as={Link}
                  aria-label="Editar"
                  href={`/main/products/${product.id}/edit`}>
                  Editar
                </DropdownItem>
                <DropdownItem
                  className="text-danger"
                  aria-label="Excluir"
                  onPress={(e) => remove(product.id)}>
                  Excluir
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
        </div>
      </CardHeader>     
    </Card>)
}