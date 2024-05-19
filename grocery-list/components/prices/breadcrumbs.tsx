"use client"

import { Breadcrumbs, BreadcrumbItem } from "@nextui-org/react";

export function PricesBreadcrumbs({ product_name }: { product_name: string }) {
  return (
    <Breadcrumbs underline="hover">
      <BreadcrumbItem href='/main/prices'>Preços</BreadcrumbItem>
      <BreadcrumbItem>{product_name}</BreadcrumbItem>
    </Breadcrumbs>
  );
}
