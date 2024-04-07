export type User = {
    id: string;
    name: string;
    email: string;
    password: string;
  };
  
  export type Category = {
    id: string;
    name: string;
  };

  export type Product = {
    id: string;
    name: string;
    category_id: string;
  };
  
  export type Purchase = {
    id: string;
    product_id: string;
    quantity: number;
    price: number;
    date: string;
  };
  

  