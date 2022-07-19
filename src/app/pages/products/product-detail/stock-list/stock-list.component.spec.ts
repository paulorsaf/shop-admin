import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog } from '@angular/material/dialog';
import { Store, StoreModule } from '@ngrx/store';
import { AppState } from 'src/app/store/app-state';
import { MatDialogMock } from 'src/mock/mat-dialog.mock';
import { PageMock } from 'src/mock/page.mock';
import { ProductsModule } from '../../products.module';
import { loadStock, loadStockSuccess } from '../store/products/product-detail.actions';
import { productDetailReducer } from '../store/products/product-detail.reducers';
import { StockListComponent } from './stock-list.component';

describe('StockListComponent', () => {
  let component: StockListComponent;
  let fixture: ComponentFixture<StockListComponent>;
  let page: PageMock;
  let store: Store<AppState>;
  let dialog: MatDialogMock;

  beforeEach(async () => {
    dialog = new MatDialogMock();

    await TestBed.configureTestingModule({
      imports: [
        ProductsModule,
        StoreModule.forRoot([]),
        StoreModule.forFeature('productDetail', productDetailReducer)
      ]
    })
    .overrideProvider(MatDialog, {useValue: dialog})
    .compileComponents();

    fixture = TestBed.createComponent(StockListComponent);
    store = TestBed.inject(Store);

    component = fixture.componentInstance;
    page = fixture.debugElement.nativeElement;

    fixture.detectChanges();
  });

  describe('given stock loading', () => {

    beforeEach(() => {
      store.dispatch(loadStock({id: '1'}));
      fixture.detectChanges();
    })

    it('then show stock loader', () => {
      expect(page.querySelector('[test-id="stock-loader"]')).not.toBeNull();
    })

    it('then hide stock details', () => {
      expect(page.querySelector('[test-id="stock-details"]')).toBeNull();
    })

  })

  describe('given stock loaded', () => {
  
    beforeEach(() => {
      dispatchLoadStockSuccess();
    })

    it('then hide stock loader', () => {
      expect(page.querySelector('[test-id="stock-loader"]')).toBeNull();
    })

    it('then show product stock details', () => {
      expect(page.querySelector('[test-id="stock-details"]')).not.toBeNull();
    })

    it('then hide no results found for stock', () => {
      expect(page.querySelector('[test-id="no-results-found"]')).toBeNull();
    })

    it('and stock is empty, then show no results found for stock', () => {
      store.dispatch(loadStockSuccess({stock: {id: 1} as any}));
      fixture.detectChanges();

      expect(page.querySelector('[test-id="no-results-found"]')).not.toBeNull();
    })

  })

  describe('given user clicks on add to stock button', () => {

    beforeEach(() => {
      dispatchLoadStockSuccess();
    })
    
    beforeEach(() => {
      page.querySelector('[test-id="add-stock-button"]').click();
      fixture.detectChanges();
    })

    it('then show add to stock modal', () => {
      expect(dialog.hasOpened).toBeTruthy();
    })

  })

  function dispatchLoadStockSuccess() {
    const stock: any = {id: 1, stockOptions: [{id: 1}]} as any;
    store.dispatch(loadStockSuccess({stock}));
    fixture.detectChanges();
  }
  
});
