"use client"

import {Breadcrumbs, BreadcrumbItem} from "@nextui-org/react";

export function CreateBreadcrumbs() {  
  return (
    <Breadcrumbs underline="hover">
        <BreadcrumbItem href='/main/products'>Produtos</BreadcrumbItem>
        <BreadcrumbItem>Novo Produto</BreadcrumbItem>
  </Breadcrumbs>
  );
}

export function EditBreadcrumbs() {  
  return (
    <Breadcrumbs underline="hover">
        <BreadcrumbItem href='/main/products'>Produtos</BreadcrumbItem>
        <BreadcrumbItem>Editar Produto</BreadcrumbItem>
  </Breadcrumbs>
  );
}