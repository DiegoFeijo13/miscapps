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

export type ProductList = {
  id: string;
  product_id: string;
  list_id: string;
  quantity: number;
  price: number;
  bought: boolean;
};

export type Category = {
  name: string;
}

export type List = {
  id: string;
  name: string;
  date: string;
};


