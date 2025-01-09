export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  color: string;
  type: "subscription" | "buyout";
  category: string;
}

export const colors = [
  { label: "Red", value: "red" },
  { label: "Blue", value: "blue" },
  { label: "Black", value: "black" },
  { label: "White", value: "white" },
  { label: "Silver", value: "silver" },
];

export const dummyProducts: Product[] = [
  {
    id: "1",
    name: "Premium Water Filter",
    price: 299.99,
    image: "https://picsum.photos/id/111/200",
    color: "silver",
    type: "subscription",
    category: "water filter",
  },
  {
    id: "2",
    name: "Basic Water Filter",
    price: 149.99,
    image: "https://picsum.photos/id/122/200",
    color: "white",
    type: "buyout",
    category: "water filter",
  },
  {
    id: "3",
    name: "Advanced Purifier",
    price: 399.99,
    image: "https://picsum.photos/id/133/200",
    color: "black",
    type: "subscription",
    category: "water filter",
  },
  {
    id: "4",
    name: "Compact Filter",
    price: 199.99,
    image: "https://picsum.photos/id/144/200",
    color: "blue",
    type: "buyout",
    category: "water filter",
  },
  {
    id: "5",
    name: "Smart Water System",
    price: 449.99,
    image: "https://picsum.photos/id/155/200",
    color: "red",
    type: "subscription",
    category: "water filter",
  },
  {
    id: "6",
    name: "Mini Purifier",
    price: 99.99,
    image: "https://picsum.photos/id/166/200",
    color: "white",
    type: "buyout",
    category: "water filter",
  },
  {
    id: "7",
    name: "Professional Filter",
    price: 499.99,
    image: "https://picsum.photos/id/177/200",
    color: "silver",
    type: "subscription",
    category: "water filter",
  },
  {
    id: "8",
    name: "Home Basic System",
    price: 249.99,
    image: "https://picsum.photos/id/188/200",
    color: "black",
    type: "buyout",
    category: "water filter",
  },
];
