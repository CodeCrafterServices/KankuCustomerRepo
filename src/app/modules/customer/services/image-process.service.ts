import { Injectable } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { FileHandle } from './interfaces/filehandel';
import { Size } from './interfaces/size.interface';
import { Cart } from './interfaces/cart.interface';

@Injectable({
  providedIn: 'root'
})
export class ImageProcessService {
  constructor(private sanitizer: DomSanitizer) { }
  productImage: any[] = [];
  productname: any = ""

  public createImage(cart: Cart) {
    if (typeof window !== 'undefined') {

      cart.sizes.map(s => {
        this.productImage = s.product.productImage
        this.productname = s.product.productName;
      })

      const productImage1: any[] = this.productImage
      const imageBlob = this.dataURIBlob(productImage1, "image/jpeg");

      const imageFile = new File([imageBlob], this.productname, { type: "image/jpeg" });

      const productImageToFileHandle: FileHandle[] = [{
        file: imageFile,
        safeUrl: this.sanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(imageFile))
      }];
      cart.sizes.map(f => {
        f.product.productImage = productImageToFileHandle
      })
      // console.log(cart);

      return cart;
    }
    return cart;
  }

  public dataURIBlob(picBytes: any, imageType: string) {
    const byteString = atob(picBytes);
    const mimeString = imageType;
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    const blob = new Blob([ia], { type: mimeString });
    return blob;
  }
}
