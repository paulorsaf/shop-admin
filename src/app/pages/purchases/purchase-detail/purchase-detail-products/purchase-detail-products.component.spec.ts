import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StoreModule } from '@ngrx/store';
import { purchaseDetailReducer } from '../store/purchase-detail.reducers';
import { PurchaseDetailProductsComponent } from './purchase-detail-products.component';

describe('PurchaseDetailProductsComponent', () => {
  let component: PurchaseDetailProductsComponent;
  let fixture: ComponentFixture<PurchaseDetailProductsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PurchaseDetailProductsComponent ],
      imports: [
        StoreModule.forRoot([]),
        StoreModule.forFeature('purchaseDetail', purchaseDetailReducer)
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PurchaseDetailProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
