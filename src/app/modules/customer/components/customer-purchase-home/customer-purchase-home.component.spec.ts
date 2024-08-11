import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerPurchaseHomeComponent } from './customer-purchase-home.component';

describe('CustomerPurchaseHomeComponent', () => {
  let component: CustomerPurchaseHomeComponent;
  let fixture: ComponentFixture<CustomerPurchaseHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CustomerPurchaseHomeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CustomerPurchaseHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
