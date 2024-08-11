import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerShoppingCartComponent } from './customer-shopping-cart.component';

describe('CustomerShoppingCartComponent', () => {
  let component: CustomerShoppingCartComponent;
  let fixture: ComponentFixture<CustomerShoppingCartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CustomerShoppingCartComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CustomerShoppingCartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
