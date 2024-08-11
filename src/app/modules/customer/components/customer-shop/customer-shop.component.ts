import { Component, OnInit } from '@angular/core';
import { Product } from '../../services/interfaces/product.interface';
import { ProductListService } from '../../services/product-list.service';

@Component({
  selector: 'app-customer-shop',
  templateUrl: './customer-shop.component.html',
  styleUrl: './customer-shop.component.css'
})
export class CustomerShopComponent implements OnInit {
  product: Product[] = [];

  constructor(private productService: ProductListService) { }

  ngOnInit(): void {

  }

}
