import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../../services/customer.service';
import { StorageService } from '../../../../auth/services/storage.service';
import { FormControl, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { Cart } from '../../services/interfaces/cart.interface';
import { map } from 'rxjs';
import { ImageProcessService } from '../../services/image-process.service';
import { Product } from '../../services/interfaces/product.interface';
import { Size } from '../../services/interfaces/size.interface';


@Component({
  selector: 'app-customer-checkout',
  templateUrl: './customer-checkout.component.html',
  styleUrl: './customer-checkout.component.css'
})
export class CustomerCheckoutComponent implements OnInit {

  carts: Cart[] = [];

  totalAmount: number = 0;

  constructor(private service: CustomerService,
    private router: Router,
    private storage: StorageService,
    private cartService: CustomerService,
    private toast: ToastrService,
    private imageProcess: ImageProcessService) {
    const navigation = this.router.getCurrentNavigation();
    if (navigation && navigation.extras.state) {
      this.carts = navigation.extras.state['carts'] || [];
      this.calculateTotal()
    }
  }
  customer = {
    customerId: 0,
    username: ''
  }

  checkoutCustomer = {
    "customerId": '',
    "fullName": '',
    "username": '',
    "password": '',
    "contact": '',
    "address": '',
    "pinCode": ''
  }



  form: FormGroup = new FormGroup({
    customerId: new FormControl(''),
    fullName: new FormControl(''),
    username: new FormControl(''),
    password: new FormControl(''),
    contact: new FormControl(''),
    address: new FormControl(''),
    pinCode: new FormControl('')
  });


  checkout: any = {
    "productOrders": [],
    "customer": {
      "customerId": 0
    }
  }
  totalCartAmount = 0

  ngOnInit(): void {
    let user = this.storage.getUser();
    this.customer.username = user.username;
    this.customer.customerId = user.customerId

    this.service.getCustomerInfo(this.customer).subscribe(res => {
      if (res !== null) {
        // console.log(res);
        this.checkoutCustomer = res;
        this.form.get("customerId")?.setValue(this.checkoutCustomer.customerId);
        this.form.get("fullName")?.setValue(this.checkoutCustomer.fullName);
        this.form.get("username")?.setValue(this.checkoutCustomer.username);
        this.form.get("contact")?.setValue(this.checkoutCustomer.contact);
        this.form.get("address")?.setValue(this.checkoutCustomer.address);
        this.form.get("pinCode")?.setValue(this.checkoutCustomer.pinCode);
      }
    }, err => {
      console.log(err);
    })

    // console.log(this.customer.username);



    this.cartService.getAllCartsByCustomer(this.customer)
      .pipe(
        map((x: Cart[], i) => x.map((cart: Cart) => this.imageProcess.createImage(cart)))
      ).subscribe(res => {
        this.carts = res;
        this.carts.map((c) => {
          this.checkout.customer = this.customer
          c.sizes.map(s => {
            this.totalCartAmount += (c.cartProductQuantity * s.productPrice)
            s.productPrice = c.cartProductQuantity * s.productPrice
            this.checkout.productOrders.push({
              product: { productId: s.product.productId },
              orderQuantity: c.cartProductQuantity,
              size: { sizeId: s.sizeId }
            })
          })
        })
      }, err => {
        console.log(err);
      })






  }


  calculateTotal() {
    this.totalAmount = this.carts.reduce((total, cart) => {
      return total + cart.sizes.reduce((sizeTotal, size) => sizeTotal + size.totalAmount, 0);
    }, 0);
  }



  formSubmit() {
    this.service.updateProfile(this.form.value).subscribe(res => {
      if (res !== null) {
        this.storage.saveUser(res);
        this.toast.success("User profile is updated successfully", "Profile Updated");
        this.router.navigate(['/customer-purchase-home/checkout']);
      }
    }, err => {
      console.log(err);
    })

  }

  placeOrder() {
    console.log(this.checkout);

    this.service.orderProduct(this.checkout).subscribe(res => {
      this.toast.success("Order has been successfully placed.", "Order Confirmed.");
      this.router.navigate(['/'])
    }, err => {
      console.log(err);

    })
  }






}
