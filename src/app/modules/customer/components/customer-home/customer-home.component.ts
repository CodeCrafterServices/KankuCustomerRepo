import { Component, OnInit } from '@angular/core';
import { ProductListService } from '../../services/product-list.service';
import { StorageService } from '../../../../auth/services/storage.service';
import { map } from 'rxjs';
import { Product } from '../../services/interfaces/product.interface';
import { ImageProcessingService } from '../../../../auth/services/image-processing.service';


@Component({
  selector: 'app-customer-home',
  templateUrl: './customer-home.component.html',
  styleUrl: './customer-home.component.css'
})
export class CustomerHomeComponent implements OnInit {
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
