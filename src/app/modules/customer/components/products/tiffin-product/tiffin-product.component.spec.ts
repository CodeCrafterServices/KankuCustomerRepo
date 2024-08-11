import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TiffinProductComponent } from './tiffin-product.component';

describe('TiffinProductComponent', () => {
  let component: TiffinProductComponent;
  let fixture: ComponentFixture<TiffinProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TiffinProductComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TiffinProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
