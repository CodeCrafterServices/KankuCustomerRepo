import { Component } from '@angular/core';
import { Product } from '../../../services/interfaces/product.interface';
import { ProductListService } from '../../../services/product-list.service';

@Component({
  selector: 'app-tiffin-product',
  templateUrl: './tiffin-product.component.html',
  styleUrl: './tiffin-product.component.css'
})
export class TiffinProductComponent {

  tiffin: Product[] = [];

  constructor(private productService: ProductListService) { }

  ngOnInit(): void {

  }
}
