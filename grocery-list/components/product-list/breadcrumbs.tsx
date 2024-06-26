"use client"

import { List, Product, ProductListEditVM } from "@/app/lib/definitions";
import { Breadcrumbs, BreadcrumbItem } from "@nextui-org/react";

export function CreateProductListBreadcrumbs({ list, product }: { list: List, product: Product }) {
  return (
    <Breadcrumbs underline="hover">
      <BreadcrumbItem href='/main/lists'>Listas</BreadcrumbItem>
      <BreadcrumbItem href={`/main/lists/${list.id}/edit`}>{list.name}</BreadcrumbItem>
      <BreadcrumbItem>Comprar {product.name}</BreadcrumbItem>
    </Breadcrumbs>
  );
}

export function EditProductListBreadcrumbs({ productList }: { productList: ProductListEditVM }) {
  return (
    <Breadcrumbs underline="hover">
      <BreadcrumbItem href='/main/lists'>Listas</BreadcrumbItem>
      <BreadcrumbItem href={`/main/lists/${productList.list_id}/edit`}>{productList.list_name}</BreadcrumbItem>
      <BreadcrumbItem>Editar compra de {productList.product_name}</BreadcrumbItem>
    </Breadcrumbs>
  );
}

export function BuyProductListBreadcrumbs() {
  return (
    <Breadcrumbs underline="hover">
      <BreadcrumbItem href='/main/lists'>Listas</BreadcrumbItem>
      <BreadcrumbItem>Comprar</BreadcrumbItem>
    </Breadcrumbs>
  );
}

export function AddProductListBreadcrumbs({listId}:{listId: string}) {
  return (
    <Breadcrumbs underline="hover">
      <BreadcrumbItem href='/main/lists'>Listas</BreadcrumbItem>
      <BreadcrumbItem href={`/main/lists/${listId}/product-list`}>Comprar</BreadcrumbItem>
      <BreadcrumbItem>Adicionar produtos</BreadcrumbItem>
    </Breadcrumbs>
  );
}