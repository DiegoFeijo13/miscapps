import React from 'react'
import {Breadcrumbs, BreadcrumbItem} from "@nextui-org/react";

export default function ListsBreadcrumbs() {
  const [currentPage, setCurrentPage] = React.useState("lists")
  console.log(currentPage)
  return (
    <Breadcrumbs 
      underline="active"
      // onAction ={(key) => setCurrentPage(key)}
      >
        <BreadcrumbItem key="lists" isCurrent={currentPage == "lists"}>Listas</BreadcrumbItem>
        <BreadcrumbItem key="create" isCurrent={currentPage == "create"}>Nova Lista</BreadcrumbItem>
  </Breadcrumbs>
  );
}
