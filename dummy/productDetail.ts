interface ProductDetail {
  id: string;
  name: string;
  price: number;
  images: string[];
  category: string;
  description?: string;
  specifications?: {
    name: string;
    value: string;
  }[];
}

export const productDetail: ProductDetail = {
  id: "1",
  name: "Product 1",
  price: 100,
  images: [
    "https://picsum.photos/id/1/200",
    "https://picsum.photos/id/2/200",
    "https://picsum.photos/id/3/200",
    "https://picsum.photos/id/4/200",
  ],
  category: "Category 1",
  description: "This is a detailed description of Product 1",
  specifications: [
    { name: "Color", value: "Black" },
    { name: "Size", value: "Medium" },
    { name: "Material", value: "Cotton" },
  ],
};
