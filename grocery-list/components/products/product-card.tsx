import { Product } from "@/app/lib/definitions";
import { remove } from "@/app/lib/product-actions";
import { PencilIcon, TrashIcon } from "@heroicons/react/16/solid";
import { Card, CardHeader, CardFooter, ButtonGroup, Button, CardBody, Chip } from "@nextui-org/react";
import Link from "next/link";

export default function ProductCard({ product }: { product: Product }) {
  return (
    <Card className="mb-4">
      <CardHeader>
        <div className="flex flex-col w-full text-center">
          <p className="text-lg uppercase font-semibold">{product.name}</p>
          <p className="text-small text-default-500">{product.category}</p>
        </div>
      </CardHeader>
      <CardFooter className="text-center">
        <ButtonGroup className="w-full">
          <Button
            as={Link}
            aria-label="Editar"
            href={`/main/products/${product.id}/edit`}
            variant="flat"
            startContent={<PencilIcon className="w-5" />}>
            Editar
          </Button>
          <Button
            aria-label="Excluir"
            variant="flat"
            color="danger"
            onPress={(e) => remove(product.id)}
            startContent={<TrashIcon className="w-5" />}>
            Excluir
          </Button>
        </ButtonGroup>
      </CardFooter>
    </Card>)
}