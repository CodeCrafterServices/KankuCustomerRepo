import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../../services/customer.service';
import { StorageService } from '../../../../auth/services/storage.service';
import { FormControl, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { Cart } from '../../services/interfaces/cart.interface';



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
    private storage: StorageService, private toast: ToastrService) {
    const navigation = this.router.getCurrentNavigation();
    if (navigation && navigation.extras.state) {
      this.carts = navigation.extras.state['carts'] || [];
      this.calculateTotal()
    }
  }
  customer = {
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



  ngOnInit(): void {
    let user = this.storage.getUser();
    this.customer.username = user.username;

    this.service.getCustomerInfo(this.customer).subscribe(res => {
      if (res !== null) {
        console.log(res);
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





}
