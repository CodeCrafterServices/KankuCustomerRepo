import { FileHandle } from "./filehandel";
import { Product } from "./product.interface";
import { Size } from "./size.interface";


export interface Cart {
    cartId: number;
    cartDate: string;
    sizes: Size[];
}