import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BottleProductComponent } from './bottle-product.component';

describe('BottleProductComponent', () => {
  let component: BottleProductComponent;
  let fixture: ComponentFixture<BottleProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BottleProductComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BottleProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
