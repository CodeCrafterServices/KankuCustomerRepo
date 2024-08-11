import { customerGuard } from './auth/services/guards/customer.guard';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomerHomeComponent } from './modules/customer/components/customer-home/customer-home.component';
import { CustomerShopComponent } from './modules/customer/components/customer-shop/customer-shop.component';
import { CustomerProductDetailsComponent } from './modules/customer/components/customer-product-details/customer-product-details.component';
import { CustomerShoppingCartComponent } from './modules/customer/components/customer-shopping-cart/customer-shopping-cart.component';
import { CustomerCheckoutComponent } from './modules/customer/components/customer-checkout/customer-checkout.component';
import { BottleProductComponent } from './modules/customer/components/products/bottle-product/bottle-product.component';
import { TiffinProductComponent } from './modules/customer/components/products/tiffin-product/tiffin-product.component';
import { UniformProductComponent } from './modules/customer/components/products/uniform-product/uniform-product.component';
import { ContactUsComponent } from './modules/customer/components/contact-us/contact-us.component';
import { SignInComponent } from './auth/components/sign-in/sign-in.component';
import { SignUpComponent } from './auth/components/sign-up/sign-up.component';
import { ForgetPasswordComponent } from './auth/components/forget-password/forget-password.component';
import { CustomerPurchaseHomeComponent } from './modules/customer/components/customer-purchase-home/customer-purchase-home.component';
const routes: Routes = [

  {
    path: "",
    component: CustomerHomeComponent,
  },
  {
    path:"shop",redirectTo:"shop/uniform",pathMatch:"full"
  },
  {
    path: "shop",
    component: CustomerShopComponent,
    children: [
      {
        path: "bottle",
        component: BottleProductComponent,
      },
      {
        path: "tiffin",
        component: TiffinProductComponent,
      },
      {
        path: "uniform",
        component: UniformProductComponent,
      }
    ]
  },
  {
    path: "customer-purchase-home",
    component: CustomerPurchaseHomeComponent,
    canActivate: [customerGuard],
    children: [
      {
        path: "details/:id",
        component: CustomerProductDetailsComponent,
      },
      {
        path: "my-cart",
        component: CustomerShoppingCartComponent,
      },
      {
        path: "checkout",
        component: CustomerCheckoutComponent,
      },
    ]
  },

  {
    path: "contact",
    component: ContactUsComponent,
  },
  {
    path: "sign-in",
    component: SignInComponent
  },
  {
    path:"sign-up",
    component: SignUpComponent
  },

  {
  path:"forget-password",
  component: ForgetPasswordComponent

  }



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
