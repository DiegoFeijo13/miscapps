import { ListVM } from "@/app/lib/definitions";
import { remove } from "@/app/lib/list-actions";
import { formatDateToLocal, formatCurrency } from "@/app/lib/utils";
import { EllipsisVerticalIcon } from "@heroicons/react/16/solid";
import { Card, CardHeader, CardFooter, Button, Avatar, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from "@nextui-org/react";
import Link from "next/link";

export default function ListCard({ list }: { list: ListVM }) {
  return (
    <Card className="w-full">
      <CardHeader className="justify-between">
        <Avatar isBordered name={list.name[0]} />
        <div className="flex flex-col gap-1 items-start justify-center">
          <p className="text-lg font-semibold">{list.name}</p>
          <p className="text-small text-default-500">{formatDateToLocal(list.buy_dt)}</p>
        </div>
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
                  aria-label="Comprar"
                  href={`/main/lists/${list.id}/product-list`}>
                  Comprar
                </DropdownItem>
                <DropdownItem
                  as={Link}
                  aria-label="Editar"
                  href={`/main/lists/${list.id}/edit`}>
                  Editar
                </DropdownItem>
                <DropdownItem
                  className="text-danger"
                  //as={Button}
                  aria-label="Excluir"
                  onPress={(e) => remove(list.id)}
                  >
                  Excluir
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
        </div>
      </CardHeader>
      <CardFooter className="gap-3">
        <div className="flex gap-1">
          <p className="font-semibold text-default-400 text-small">{list.items}</p>
          <p className=" text-default-400 text-small">Itens</p>
        </div>
        <div className="flex gap-1">
          <p className="font-semibold text-default-400 text-small">{formatCurrency(list.total)}</p>
          <p className="text-default-400 text-small">Total</p>
        </div>
      </CardFooter>
    </Card>)
}