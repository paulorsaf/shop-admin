import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductDetailLoadingComponent } from './product-detail-loading.component';

describe('ProductDetailLoadingComponent', () => {
  let component: ProductDetailLoadingComponent;
  let fixture: ComponentFixture<ProductDetailLoadingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductDetailLoadingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductDetailLoadingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
