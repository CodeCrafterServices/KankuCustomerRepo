import { authInterceptor } from './auth/services/auth.interceptor';
import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CustomerHomeComponent } from './modules/customer/components/customer-home/customer-home.component';
import { CustomerAboutComponent } from './modules/customer/components/customer-about/customer-about.component';
import { CustomerShopComponent } from './modules/customer/components/customer-shop/customer-shop.component';
import { CustomerHeaderComponent } from './modules/customer/components/customer-header/customer-header.component';
import { CustomerFooterComponent } from './modules/customer/components/customer-footer/customer-footer.component';
import { RouterModule } from '@angular/router';
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
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { CustomerPurchaseHomeComponent } from './modules/customer/components/customer-purchase-home/customer-purchase-home.component';


@NgModule({
  declarations: [
    AppComponent,
    CustomerHomeComponent,
    CustomerAboutComponent,
    CustomerShopComponent,
    CustomerHeaderComponent,
    CustomerFooterComponent,
    CustomerProductDetailsComponent,
    CustomerShoppingCartComponent,
    CustomerCheckoutComponent,
    BottleProductComponent,
    TiffinProductComponent,
    UniformProductComponent,
    ContactUsComponent,
    SignInComponent,
    SignUpComponent,
    ForgetPasswordComponent,
    CustomerPurchaseHomeComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    RouterModule,
    ReactiveFormsModule,
    HttpClientModule,
    ToastrModule.forRoot({
      timeOut: 10000,
      positionClass: 'toast-bottom-right',
      preventDuplicates: true,
    })
  ],
  providers: [
    // provideClientHydration(),
    authInterceptor,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
