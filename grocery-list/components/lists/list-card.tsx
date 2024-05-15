import { ListVM } from "@/app/lib/definitions";
import { remove } from "@/app/lib/list-actions";
import { formatDateToLocal, formatCurrency } from "@/app/lib/utils";
import { ShoppingCartIcon, PencilIcon, TrashIcon } from "@heroicons/react/16/solid";
import { Card, CardHeader, CardFooter, ButtonGroup, Button } from "@nextui-org/react";
import Link from "next/link";

export default function ListCard({ list }: { list: ListVM }) {
    return (
      <Card className="mb-4">
        <CardHeader className="flex gap-3">
          <div className="flex flex-col w-1/2">
            <p className="text-lg uppercase font-semibold">{list.name}</p>
            <p className="text-small text-default-500">{formatDateToLocal(list.buy_dt)}</p>
          </div>
          <div className="flex flex-col w-1/2 text-right">
            <p><span className="text-lg font-semibold">Itens:</span>{list.items}</p>
            <p className="text-small text-default-500">{formatCurrency(list.total)}</p>
          </div>
        </CardHeader>            
        <CardFooter className="text-center">
          <ButtonGroup className="w-full">
            <Button
              as={Link}
              aria-label="Comprar"
              color="primary"
              href={`/main/lists/${list.id}/product-list`}            
              variant="flat"
              startContent={<ShoppingCartIcon className="w-5" />}>
              Comprar
            </Button>
            <Button
              as={Link}
              aria-label="Editar"
              href={`/main/lists/${list.id}/edit`}            
              variant="flat"
              startContent={<PencilIcon className="w-5" />}>
              Editar
            </Button>
            <Button            
              aria-label="Excluir"            
              variant="flat"
              color="danger"
              onPress={(e) => remove(list.id)}
              startContent={<TrashIcon className="w-5" />}
            >
              Excluir
            </Button>
          </ButtonGroup>
        </CardFooter>
      </Card>)
  }