import { Injectable } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { FileHandle } from '../../../services/interfaces/filehandel';
import { DetailProduct } from './interface/ProductDetails.interface';

@Injectable({
  providedIn: 'root'
})
export class ImageProcessService {
  constructor(private sanitizer: DomSanitizer) { }

  public createImage(product: DetailProduct) {
    if (typeof window !== 'undefined') {
      const productImage: any = product.productImage;
      const imageBlob = this.dataURIBlob(productImage, "image/jpeg");

      const imageFile = new File([imageBlob], product.productName, { type: "image/jpeg" });

      const productImageToFileHandle: FileHandle = {
        file: imageFile,
        safeUrl: this.sanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(imageFile))
      };
      product.productImage = productImageToFileHandle;
      return product;
    }
    return product;
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
