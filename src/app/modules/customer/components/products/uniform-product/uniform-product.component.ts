import { Component } from '@angular/core';
import { ProductListService } from '../../../services/product-list.service';
import { Product } from '../../../services/interfaces/product.interface';
import { ImageProcessingService } from '../../../../../auth/services/image-processing.service';
import { StorageService } from '../../../../../auth/services/storage.service';
import { map } from 'rxjs';
@Component({
  selector: 'app-uniform-product',
  templateUrl: './uniform-product.component.html',
  styleUrl: './uniform-product.component.css'
})
export class UniformProductComponent {
  constructor(private service: ProductListService,
    private storage: StorageService,
    private imageProcessingService: ImageProcessingService) { }

  products: Product[] = []

  ngOnInit(): void {

    this.storage.isTokenExpired();

    this.service.getAllProducts()
      .pipe(
        map((x: Product[], i) => x.map((product: Product) => this.imageProcessingService.createImage(product)))
      ).subscribe(res => {
        this.products = res;
        console.log(this.products);

      }, err => {
        console.log(err);
      })
  }
}
