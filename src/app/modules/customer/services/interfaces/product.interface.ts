import { FileHandle } from "./filehandel";


export interface Product {
  price: string;
  dropPrice: string;
  category: string;
  date: string;
  name: string;
  productId: number;
  productName: string;
  productDescription: string;
  productCategory: string;
  productPrice: string;
  productSize: string;
  productImage: FileHandle[];
  productDate: string;
}