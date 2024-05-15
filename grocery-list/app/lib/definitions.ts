export type User = {
  id: string;
  name: string;
  email: string;
  password: string;
};

export type Product = {
  id: string;
  name: string;
  category: string;
};

export type ProductListVM = {
  productList_id: string | null;
  quantity: number | null;
  price: number | null;  
  product_name: string;
  category: string;
  product_id: string;
  list_id: string;
  done: boolean;
};

export type ProductListEditVM = {
  id: string;
  quantity: number;
  price: number;  
  product_name: string; 
  category: string; 
  list_name: string;
  list_id: string;
};

export type Category = {
  name: string;
}

export type List = {
  id: string;
  name: string;
  buy_dt: string;
};

export type ListVM = {
  id: string,
  name: string,
  buy_dt: string,
  items: number,
  total: number,
}


