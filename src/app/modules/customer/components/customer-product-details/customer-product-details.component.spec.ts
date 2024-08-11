import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerProductDetailsComponent } from './customer-product-details.component';

describe('CustomerProductDetailsComponent', () => {
  let component: CustomerProductDetailsComponent;
  let fixture: ComponentFixture<CustomerProductDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CustomerProductDetailsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CustomerProductDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
