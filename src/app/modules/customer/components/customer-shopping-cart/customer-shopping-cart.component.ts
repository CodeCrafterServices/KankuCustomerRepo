import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../../services/customer.service';
import { map } from 'rxjs';
import { ImageProcessService } from '../../services/image-process.service';
import { StorageService } from '../../../../auth/services/storage.service';
import { Size } from '../../services/interfaces/size.interface';
import { Cart } from '../../services/interfaces/cart.interface';
import { NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-customer-shopping-cart',
  templateUrl: './customer-shopping-cart.component.html',
  styleUrls: ['./customer-shopping-cart.component.css']
})
export class CustomerShoppingCartComponent implements OnInit {

  constructor(
    private cartService: CustomerService,
    private storage: StorageService,
    private imageProcess: ImageProcessService,
    private service: CustomerService,
    private router: Router
  ) { }

  customer = {
    "customerId": ''
  }

  cart_obj = {
    'cartId': 0,
    'cartProductQuantity': 0
  }

  cart_product_qty: any = 1

  carts: Cart[] = []

  ngOnInit(): void {
    let customer = this.storage.getUser();
    this.customer.customerId = customer.customerId;

    this.cartService.getAllCartsByCustomer(this.customer)
      .pipe(
        map((x: Cart[], i) => x.map((cart: Cart) => this.imageProcess.createImage(cart)))
      ).subscribe(res => {
        this.carts = res;
        this.carts.map((c) => {
          c.sizes.map((p) => {
            p.totalProductQuantity = 1;
            p.totalAmount = p.productPrice;
          })
        })
      }, err => {
        console.log(err);
      })
  }

  cart = {
    "cartId": '',
  }

  updateCartItem(item: any) {
    this.service.updateCartItem(item).subscribe(
      (response) => {
        console.log('Item updated successfully in the backend', response);
        // const index = this.carts.findIndex(cart =>
        //   cart.sizes.some(size => size.product.productId === item.product.productId)
        // );
        // if (index !== -1) {
        //   const sizeIndex = this.carts[index].sizes.findIndex(size => size.product.productId === item.product.productId);
        //   if (sizeIndex !== -1) {
        //     this.carts[index].sizes[sizeIndex] = item;
        //   }
        // }
      },
      (error) => {
        console.error('Error updating item in the backend', error);
      }
    );
  }

  deleteItemFormCart(id: any) {
    this.cart.cartId = id;
    this.service.deleteCartItem(this.cart).subscribe(res => {
      this.router.navigate(['/customer-purchase-home/my-cart']);
      this.ngOnInit();
    }, err => {
      this.router.navigate(['/customer-purchase-home/my-cart']);
      this.ngOnInit();
    })
  }

  proceedToCheckout() {
    const navigationExtras: NavigationExtras = {
      state: {
        carts: this.carts
      }
    };
    this.router.navigate(['/customer-purchase-home/checkout'], navigationExtras);
  }




  increaseQuantity(p: any, c: Cart) {
    p.totalProductQuantity++;
    this.cart_obj.cartId = c.cartId;
    this.cart_obj.cartProductQuantity = p.totalProductQuantity;
    p.totalAmount = (p.totalProductQuantity * p.productPrice);
    console.log(this.cart_obj);


    // this.updateCartItem(this.cart_obj);
  }


  decreaseQuantity(p: any, c: Cart) {
    if (p.totalProductQuantity > 1) {
      p.totalProductQuantity--;
      this.cart_obj.cartId = c.cartId;
      this.cart_obj.cartProductQuantity = p.totalProductQuantity;
      p.totalAmount = (p.totalProductQuantity * p.productPrice);
      console.log(this.cart_obj);

      // this.updateCartItem(item);
    }
  }
}
