import { FileHandle } from "./filehandel";
import { Product } from "./product.interface";


export interface Size {
productName: any;
    sizeId: number;
    sizeType: string;
    productDropPrice: number;
    productPrice: number;
    totalProductQuantity: number;
    totalAmount: number;
    product: Product;
}