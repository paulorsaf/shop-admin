import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ActivatedRoute } from '@angular/router';
import { Store, StoreModule } from '@ngrx/store';
import { Product } from 'src/app/model/product/product';
import { MessageService } from 'src/app/services/message/message.service';
import { AppState } from 'src/app/store/app-state';
import { ActivatedRouteMock } from 'src/mock/activated-route.mock';
import { MatDialogMock } from 'src/mock/mat-dialog.mock';
import { MessageServiceMock } from 'src/mock/message-service.mock';
import { PageMock } from 'src/mock/page.mock';
import { categoriesReducer } from '../../categories/store/categories.reducers';
import { ProductsModule } from '../products.module';
import { ProductDetailComponent } from './product-detail.component';
import { loadDetailSuccess, loadStockSuccess, saveDetailFail, saveDetailSuccess } from './store/products/product-detail.actions';
import { productDetailReducer } from './store/products/product-detail.reducers';

fdescribe('ProductDetailComponent', () => {
  let component: ProductDetailComponent;
  let fixture: ComponentFixture<ProductDetailComponent>;
  let store: Store<AppState>;
  let page: PageMock;
  let activatedRoute: ActivatedRouteMock;
  let messageService: MessageServiceMock;
  let dialog: MatDialogMock;

  beforeEach(async () => {
    activatedRoute = new ActivatedRouteMock();
    dialog = new MatDialogMock();
    messageService = new MessageServiceMock();

    await TestBed.configureTestingModule({
      imports: [
        ProductsModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        StoreModule.forRoot([]),
        StoreModule.forFeature('categories', categoriesReducer),
        StoreModule.forFeature('productDetail', productDetailReducer)
      ]
    })
    .overrideProvider(ActivatedRoute, {useValue: activatedRoute})
    .overrideProvider(MatDialog, {useValue: dialog})
    .overrideProvider(MessageService, {useValue: messageService})
    .compileComponents();

    fixture = TestBed.createComponent(ProductDetailComponent);
    store = TestBed.inject(Store);

    component = fixture.componentInstance;
    page = fixture.debugElement.nativeElement;
    
    activatedRoute.value = '1';
  });

  it('given page starts, then load categories', done => {
    fixture.detectChanges();

    store.select('categories').subscribe(state => {
      expect(state.isLoading).toBeTruthy();
      done();
    })
  });

  describe('given new product', () => {

    beforeEach(() => {
      activatedRoute.value = "new";

      fixture.detectChanges();
    })

    it('then do not load product by id', done => {
      fixture.detectChanges();
  
      store.select('productDetail').subscribe(state => {
        expect(state.isLoading).toBeFalsy();
        done();
      })
    });

    it('then create form with product detail empty values', () => {
      expect(component.form.value).toEqual({
        description: '',
        id: null,
        name: "",
        categoryId: "",
        price: 0,
        priceWithDiscount: 0,
        unit: '',
        weight: ''
      })
    })

    it('then hide product images', () => {
      expect(page.querySelector('[test-id="product-images"]')).toBeNull();
    })

  })

  describe('given update product', () => {

    beforeEach(() => {
      fixture.detectChanges();
    })
  
    it('then load product by id', done => {
      store.select('productDetail').subscribe(state => {
        expect(state.isLoading).toBeTruthy();
        done();
      })
    });

    describe('when loading product', () => {

      it('then show product loader', () => {
        expect(page.querySelector('[test-id="product-loader"]')).not.toBeNull();
      })
  
      it('then hide product detail', () => {
        expect(page.querySelector('[test-id="product"]')).toBeNull();
      })

    })

    describe('when product loaded', () => {

      beforeEach(() => {
        dispatchLoadDetailSuccess();
      })

      it('then create form with product detail values', () => {
        expect(component.form.value).toEqual({
          description: 'anyDescription',
          id: 1,
          name: "name",
          categoryId: "1",
          price: 10,
          priceWithDiscount: 5,
          unit: "KG",
          weight: 1
        })
      })

      it('then hide product loader', () => {
        expect(page.querySelector('[test-id="product-loader"]')).toBeNull();
      })
  
      it('then show product detail', () => {
        expect(page.querySelector('[test-id="product"]')).not.toBeNull();
      })

      it('then show product images', () => {
        expect(page.querySelector('[test-id="product-images"]')).not.toBeNull();
      })

    })

  })

  describe('given form', () => {

    beforeEach(() => {
      activatedRoute.value = "new";

      fixture.detectChanges();
    })

    it('when product name is empty, then product name should be invalid', () => {
      component.form.get('name')?.setValue('');
      fixture.detectChanges();

      expect(component.form.get('name')?.valid).toBeFalsy();
    })

    it('when product name is not empty, then product name should be valid', () => {
      component.form.get('name')?.setValue('anyName');
      fixture.detectChanges();

      expect(component.form.get('name')?.valid).toBeTruthy();
    })

    it('when category is empty, then category should be invalid', () => {
      component.form.get('categoryId')?.setValue('');
      fixture.detectChanges();

      expect(component.form.get('categoryId')?.valid).toBeFalsy();
    })

    it('when category is not empty, then category should be valid', () => {
      component.form.get('categoryId')?.setValue('anyName');
      fixture.detectChanges();

      expect(component.form.get('categoryId')?.valid).toBeTruthy();
    })

    it('when price is empty, then price should be invalid', () => {
      component.form.get('price')?.setValue('');
      fixture.detectChanges();

      expect(component.form.get('price')?.valid).toBeFalsy();
    })

    it('when price is not empty, then price should be valid', () => {
      component.form.get('price')?.setValue('anyName');
      fixture.detectChanges();

      expect(component.form.get('price')?.valid).toBeTruthy();
    })

    it('when form is invalid, then disable save button', () => {
      component.form.get('price')?.setValue('');
      fixture.detectChanges();

      expect(page.querySelector('[test-id="save-button"]').disabled).toBeTruthy();
    })

    it('when product weight is empty, then product weight should be invalid', () => {
      component.form.get('weight')?.setValue('');
      fixture.detectChanges();

      expect(component.form.get('weight')?.valid).toBeFalsy();
    })

    it('when product weight is not empty, then product weight should be valid', () => {
      component.form.get('weight')?.setValue('anyWeight');
      fixture.detectChanges();

      expect(component.form.get('weight')?.valid).toBeTruthy();
    })

    it('when form is valid, then enable save button', () => {
      component.form.get('name')?.setValue('anyName');
      component.form.get('categoryId')?.setValue('anyCategory');
      component.form.get('price')?.setValue('anyPrice');
      component.form.get('unit')?.setValue('anyUnit');
      component.form.get('weight')?.setValue('anyWeight');
      fixture.detectChanges();

      expect(page.querySelector('[test-id="save-button"]').disabled).toBeFalsy();
    })

  })

  describe('given user clicks on save button', () => {

    beforeEach(() => {
      fixture.detectChanges();

      dispatchLoadDetailSuccess();

      page.querySelector('[test-id="save-button"]').click();
      fixture.detectChanges();
    })

    it('then save product', done => {
      store.select('productDetail').subscribe(state => {
        expect(state.isSaving).toBeTruthy();
        done();
      })
    })

    describe('when saving product', () => {

      it('then show save loader', () => {
        expect(page.querySelector('[test-id="save-loader"]')).not.toBeNull();
      })
  
      it('then hide save button', () => {
        expect(page.querySelector('[test-id="save-button"]')).toBeNull();
      })

    })

    describe('when product saved with success', () => {

      beforeEach(() => {
        store.dispatch(saveDetailSuccess());
        fixture.detectChanges();
      })

      it('then hide save loader', () => {
        expect(page.querySelector('[test-id="save-loader"]')).toBeNull();
      })
  
      it('then show save button', () => {
        expect(page.querySelector('[test-id="save-button"]')).not.toBeNull();
      })

    })

    describe('when error on product save', () => {

      beforeEach(() => {
        const error = {error: "error"};
        store.dispatch(saveDetailFail({error}));
        fixture.detectChanges();
      })

      it('then hide save loader', () => {
        expect(page.querySelector('[test-id="save-loader"]')).toBeNull();
      })
  
      it('then show save button', () => {
        expect(page.querySelector('[test-id="save-button"]')).not.toBeNull();
      })

      it('then show error message', () => {
        expect(messageService._hasShownError).toBeTruthy();
      })

    })

  })

  describe('given stock', () => {

    describe('when page starts with new product', () => {

      beforeEach(() => {
        activatedRoute.value = "new";

        fixture.detectChanges();
      })

      it('then hide product stock', () => {
        expect(page.querySelector('[test-id="stock"]')).toBeNull();
      })
  
      it('then do not load product stock', done => {
        store.select('productDetail').subscribe(state => {
          expect(state.isLoadingStock).toBeFalsy();
          done();
        })
      })
      
    })

    describe('when page starts with existing product', () => {
  
      beforeEach(() => {
        activatedRoute.value = "1";
        fixture.detectChanges();
        
        dispatchLoadDetailSuccess();
      })

      it('then load stock', done => {
        store.select('productDetail').subscribe(state => {
          expect(state.isLoadingStock).toBeTruthy();
          done();
        })
      })

      it('then show stock', () => {
        expect(page.querySelector('[test-id="stock"]')).not.toBeNull();
      })

    })

  })

  function dispatchLoadDetailSuccess() {
    const product: Product = {
      description: 'anyDescription', id: 1, name: "name", categoryId: '1', price: 10,
      priceWithDiscount: 5, unit: "KG", weight: 1
    } as any;
    store.dispatch(loadDetailSuccess({product}));
    fixture.detectChanges();
  }

});
