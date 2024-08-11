import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UniformProductComponent } from './uniform-product.component';

describe('UniformProductComponent', () => {
  let component: UniformProductComponent;
  let fixture: ComponentFixture<UniformProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UniformProductComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UniformProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
