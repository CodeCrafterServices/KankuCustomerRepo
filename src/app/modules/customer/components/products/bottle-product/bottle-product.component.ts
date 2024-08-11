import { Component, OnInit } from '@angular/core';
import { ProductListService } from '../../../services/product-list.service';
import { Product } from '../../../services/interfaces/product.interface';

@Component({
  selector: 'app-bottle-product',
  templateUrl: './bottle-product.component.html',
  styleUrl: './bottle-product.component.css'
})
export class BottleProductComponent implements OnInit {
  bottle: Product[] = [];

  constructor(private productService: ProductListService) { }

  ngOnInit(): void {

  }
}
