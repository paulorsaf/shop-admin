import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchaseDetailLoaderComponent } from './purchase-detail-loader.component';

describe('PurchaseDetailLoaderComponent', () => {
  let component: PurchaseDetailLoaderComponent;
  let fixture: ComponentFixture<PurchaseDetailLoaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PurchaseDetailLoaderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PurchaseDetailLoaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
