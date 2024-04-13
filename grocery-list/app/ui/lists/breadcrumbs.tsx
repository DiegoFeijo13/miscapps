"use client"

import {Breadcrumbs, BreadcrumbItem} from "@nextui-org/react";

export function CreateListBreadcrumbs() {  
  return (
    <Breadcrumbs underline="hover">
        <BreadcrumbItem href='/main/lists'>Listas</BreadcrumbItem>
        <BreadcrumbItem>Nova Lista</BreadcrumbItem>
  </Breadcrumbs>
  );
}

export function EditListBreadcrumbs() {  
  return (
    <Breadcrumbs underline="hover">
        <BreadcrumbItem href='/main/lists'>Listas</BreadcrumbItem>
        <BreadcrumbItem>Editar Lista</BreadcrumbItem>
  </Breadcrumbs>
  );
}