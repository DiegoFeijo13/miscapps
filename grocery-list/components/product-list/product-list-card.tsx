import { ProductListVM } from "@/app/lib/definitions";
import { TrashIcon } from "@heroicons/react/16/solid";
import { Card, CardHeader, CardFooter, ButtonGroup, Button, CardBody, Checkbox, Input, Spacer } from "@nextui-org/react";
import { toggleDone, updateQuantity, updatePrice, remove } from "@/app/lib/product-list-actions";
import { formatNumber, formatNumberToLocaleString } from "@/app/lib/utils";


export default function ProductListCard({ product }: { product: ProductListVM }) {
  const toggleIsDone = (e: any) => {
    if (product.productList_id == null)
      return;

    toggleDone(product.productList_id, e.target.checked)
  }

  const updateQuantityEvent = (value: string) => {
    if (!product.productList_id)
      return;

    let quantity = parseFloat(value);

    if (!quantity || quantity <= 0)
      return;

    updateQuantity(product.productList_id, quantity)
  }

  const updatePriceEvent = (value: string) => {
    if (!product.productList_id)
      return;

    let price = parseFloat(value);

    if (!price || price <= 0)
      return;

    updatePrice(product.productList_id, price)
  }

  return (
    <Card className="mb-4">
      <CardHeader>
        <Checkbox
          name="done"
          defaultSelected={product.done}
          onChange={(e) => toggleIsDone(e)} />
        <p className="text-lg uppercase font-semibold">{product.product_name}</p>
      </CardHeader>
      <CardBody>
        <Input
          type="number"
          label="Quantidade"
          aria-label="Quantidade"
          defaultValue={product.quantity?.toString()}
          onValueChange={(value) => updateQuantityEvent(value)}
          labelPlacement="inside"
          size="sm" />

        <Spacer y={4} />
        <Input
          type="number"
          label="Preço"
          aria-label="Preço"
          defaultValue={formatNumberToLocaleString(product.price ?? 0)}          
          onValueChange={(value) => updatePriceEvent(value)}
          labelPlacement="inside"
          size="sm"
          className="text-right" />

      </CardBody>
      <CardFooter className="text-center">
        <Button
          aria-label="Excluir"
          className="w-full"
          variant="flat"
          color="danger"
          onPress={(e) => remove(product.productList_id ?? "")}
          startContent={<TrashIcon className="w-5" />}>
          Excluir
        </Button>
      </CardFooter>
    </Card>)
}