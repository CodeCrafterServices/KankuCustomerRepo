import { FileHandle } from "../../../../services/interfaces/filehandel";
import { Size } from "../../../../services/interfaces/size.interface";
import { ProductSize } from "./ProductSize.interface";



export interface DetailProduct {
    productId: number;
    productName: string;
    productDescription: string;
    productImage?: FileHandle | null;
    productDate: string;
    productCategory: string;
    sizes: ProductSize[]
}