import { gotoProductChart } from "@/app/lib/actions";
import { Product } from "@/app/lib/definitions";
import { Card, CardHeader } from "@nextui-org/react";

export default function ProductCard({ product }: { product: Product }) {
  return (
    <Card
      isPressable
      className="mb-4"
      onPress={(e) => gotoProductChart(product.id)}
    >
      <CardHeader className="justify-between">
        <div className="flex flex-col gap-1 items-start justify-center">
          <p className="text-lg font-semibold">{product.name}</p>
          <p className="font-semibold text-default-400 text-small">{product.category}</p>
        </div>
      </CardHeader>
    </Card>)
}