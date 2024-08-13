import { Component, OnInit } from '@angular/core';
import { ProductListService } from '../../services/product-list.service';
import { ActivatedRoute, Router } from '@angular/router';
import { StorageService } from '../../../../auth/services/storage.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CustomerService } from '../../services/customer.service';
import { map } from 'rxjs';
import { ImageProcessService } from './image-service/image-process.service';
import { DetailProduct } from './image-service/interface/ProductDetails.interface';
import { FileHandle } from '../../services/interfaces/filehandel';


@Component({
  selector: 'app-customer-product-details',
  templateUrl: './customer-product-details.component.html',
  styleUrl: './customer-product-details.component.css'
})
export class CustomerProductDetailsComponent implements OnInit {
  productId: string | null = null;
  constructor(private service: ProductListService,
    private router: ActivatedRoute,
    private storage: StorageService,
    private formBuilder: FormBuilder,
    private customerService: CustomerService,
    private route: Router,
    private _imageProcess: ImageProcessService
  ) { }

  isSizesAreNull: Boolean = false;
  priceTag: any;
  customerId: any = 0;


  product: DetailProduct = {
    "productId": 0,
    "productName": '',
    "productDescription": '',
    "productImage": null,
    "productDate": '',
    "productCategory": '',
    "sizes": [
      {
        "sizeId": 0,
        "sizeType": '',
        "productDropPrice": 0.0,
        "productPrice": 0.0,
        "totalProductQuantity": 0,
        "totalAmount": 0.0
      }
    ]
  }



  ngOnInit(): void {

    let customer = this.storage.getUser();
    this.customerId = customer.customerId;
    // console.log(this.customerId);

    this.form = this.formBuilder.group({
      sizeId: ['', Validators.required],
    })

    this.storage.isTokenExpired();


    this.router.paramMap.subscribe(paramMap => {
      this.productId = paramMap.get('id');
    })

    this.size.product.productId = this.productId

    this.service.getProductById(this.productId)
      .pipe(
        map((x: DetailProduct) => this._imageProcess.createImage(x))
      ).subscribe(res => {
        this.product = res;

        console.log(res);


        this.service.getSizeByProductId(this.size).subscribe(res => {
          if (res !== null) {
            // console.log(res);
            this.product.sizes = res;
            this.isSizesAreNull = true;
            let i = 0;
            this.product.sizes.map(r => {

              i += 1;
              if (i == 1) {
                this.priceTag = r.productPrice;
              }

            })
          }
        }, err => {
          console.log(err);
          this.isSizesAreNull = false;
        })

      }, err => {
        console.log(err);
      })

  }



  size = {
    "product": {
      "productId": this.productId,
    }
  }

  sizes = [
    {
      "sizeId": '',
    }
  ]

  sizeObj = {
    "sizes": this.sizes,
    "customer_id": '',
    "cartProductQuantity": 0
  }

  form: FormGroup = new FormGroup({
    sizeId: new FormControl(''),
  })


  addToCart() {
    this.sizeObj.customer_id = this.customerId;
    this.sizeObj.cartProductQuantity = 1;
    this.sizes.map(s => {
      s.sizeId = this.form.get("sizeId")?.value;
    })

    console.log(JSON.stringify(this.sizeObj));


    this.customerService.addToCart(this.sizeObj).subscribe(res => {
      if (res) {
        this.route.navigate(['/customer-purchase-home/my-cart'])
      }
    }, err => {
      console.log(err);
    })
  }



  setValue(s: any) {
    this.priceTag = s.productPrice;
    this.form.get("sizeId")?.setValue(s.sizeId);
  }

}
