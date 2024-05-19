"use client"
import { ProductListVM } from "@/app/lib/definitions";
import { formatCurrency } from "@/app/lib/utils";
import { Card, CardBody, CardFooter, CardHeader, Progress, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from "@nextui-org/react";

export default function Total({ products }: { products: ProductListVM[] }) {
    const add = function (partial: number, product: ProductListVM) {
        let quantity = product?.quantity ?? 0;
        let price = product?.price ?? 0;
        return partial + (quantity * price);
    }

    const totalProducts = products.length;
    const amount = products.reduce(add, 0)
    const bought = products.filter((p) => p.done).length
    const boughtAmount = products.filter((p) => p.done).reduce(add, 0)

    return (
        <div className="grid justify-items-center">
            <Card className="bg-gradient-to-r from-secondary to-violet-500 w-80">
                <CardBody>
                    <p>
                        <span className="text-white"> Total</span>
                        <span className="text-xl text-white"> {formatCurrency(boughtAmount)}</span>

                    </p>
                </CardBody>
                <CardFooter>
                    <Progress
                        label="Produtos"
                        size="sm"
                        value={bought}
                        maxValue={totalProducts}
                        color="primary"
                        formatOptions={{ style: "decimal" }}
                        showValueLabel={true}
                        className="max-w-md text-white justify-items-center"
                    />
                </CardFooter>
            </Card>
        </div>
    );
}