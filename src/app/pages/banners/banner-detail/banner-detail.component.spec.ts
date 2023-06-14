import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ActivatedRoute } from '@angular/router';
import { Store, StoreModule } from '@ngrx/store';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { MessageService } from 'src/app/services/message/message.service';
import { AppState } from 'src/app/store/app-state';
import { ActivatedRouteMock } from 'src/mock/activated-route.mock';
import { MessageServiceMock } from 'src/mock/message-service.mock';
import { PageMock } from 'src/mock/page.mock';
import { loadProductsSuccess } from '../../products/store/products/products.actions';
import { productsReducer } from '../../products/store/products/products.reducers';
import { BannerDetailComponent } from './banner-detail.component';
import { loadBannerDetailFail, loadBannerDetailSuccess, saveBannerDetailFail, saveBannerDetailSuccess } from './store/banner-detail.actions';
import { bannerDetailReducer } from './store/banner-detail.reducers';

describe('BannerDetailComponent', () => {
  let component: BannerDetailComponent;
  let fixture: ComponentFixture<BannerDetailComponent>;
  let store: Store<AppState>;
  let page: PageMock;
  let activatedRoute: ActivatedRouteMock;
  let messageService: MessageServiceMock;

  beforeEach(async () => {
    activatedRoute = new ActivatedRouteMock();
    messageService = new MessageServiceMock();

    await TestBed.configureTestingModule({
      declarations: [
        BannerDetailComponent
      ],
      imports: [
        ReactiveFormsModule,
        BrowserAnimationsModule,
        MatSelectModule,
        NgxSkeletonLoaderModule,
        StoreModule.forRoot([]),
        StoreModule.forFeature('bannerDetail', bannerDetailReducer),
        StoreModule.forFeature('products', productsReducer)
      ]
    })
    .overrideProvider(ActivatedRoute, {useValue: activatedRoute})
    .overrideProvider(MessageService, {useValue: messageService})
    .compileComponents();

    fixture = TestBed.createComponent(BannerDetailComponent);
    store = TestBed.inject(Store);

    component = fixture.componentInstance;
    page = fixture.debugElement.nativeElement;
  });

  it('given page starts, then load products', done => {
    fixture.detectChanges();

    store.select('products').subscribe(state => {
      expect(state.isLoading).toBeTruthy();
      done();
    })
  })

  describe('given form', () => {

    beforeEach(() => {
      activatedRoute.value = 'new';
      fixture.detectChanges();

      store.dispatch(loadProductsSuccess({products: []}));
      fixture.detectChanges();
    })
    
    it('when product is empty, then product should be invalid', () => {
      component.form.get('productId')!.setValue('');
      fixture.detectChanges();

      expect(component.form.get('productId')!.valid).toBeFalsy();
    })
    
    it('when product has value, then product should be valid', () => {
      component.form.get('productId')!.setValue('anyProductId');
      fixture.detectChanges();

      expect(component.form.get('productId')!.valid).toBeTruthy();
    })
    
    it('when form is invalid, then disable save button', () => {
      component.form.get('productId')!.setValue('');
      fixture.detectChanges();

      expect(page.querySelector('[test-id="save-button"]').disabled).toBeTruthy();
    })
    
    it('when form is valid, then enable save button', () => {
      component.form.get('productId')!.setValue('anyProductId');
      fixture.detectChanges();

      expect(page.querySelector('[test-id="save-button"]').disabled).toBeFalsy();
    })
    
  })

  describe('given new banner', () => {

    beforeEach(() => {
      activatedRoute.value = 'new';
      fixture.detectChanges();
      
      store.dispatch(loadProductsSuccess({products: []}));
      fixture.detectChanges();
    })

    it('when page starts, then do not load banner', done => {
      store.select('bannerDetail').subscribe(state => {
        expect(state.isLoading).toBeFalsy();
        done();
      })
    })

    it('when page starts, then create empty form', () => {
      expect(component.form.value).toEqual({
        id: '',
        productId: ''
      })
    })

  })

  describe('given update banner', () => {

    beforeEach(() => {
      activatedRoute.value = 'anyBannerId';
      fixture.detectChanges();
      
      store.dispatch(loadProductsSuccess({products: []}));
      fixture.detectChanges();
    })

    it('when page starts, then load banner', done => {
      store.select('bannerDetail').subscribe(state => {
        expect(state.isLoading).toBeTruthy();
        done();
      })
    })

    describe('when loading banner', () => {

      it('then show banner loader', () => {
        expect(page.querySelector('[test-id="banner-loader"]')).not.toBeNull();
      })

      it('then hide banner', () => {
        expect(page.querySelector('[test-id="banner"]')).toBeNull();
      })

    })

    describe('when banner loaded', () => {

      beforeEach(() => {
        const banner = {id: '1', productId: "anyProductId"} as any;
        store.dispatch(loadBannerDetailSuccess({banner}));
        fixture.detectChanges();
      })

      it('then hide banner loader', () => {
        expect(page.querySelector('[test-id="banner-loader"]')).toBeNull();
      })

      it('then load banner', () => {
        expect(page.querySelector('[test-id="banner"]')).not.toBeNull();
      })

      it('then create form with banner values', () => {
        expect(component.form.value).toEqual({
          id: '1',
          productId: 'anyProductId'
        })
      })

    })

    describe('when error on loading banner', () => {

      beforeEach(() => {
        const error = {error: "error"} as any;
        store.dispatch(loadBannerDetailFail({error}));
        fixture.detectChanges();
      
        store.dispatch(loadProductsSuccess({products: []}));
        fixture.detectChanges();
      })

      it('then hide banner loader', () => {
        expect(page.querySelector('[test-id="banner-loader"]')).toBeNull();
      })

      it('then load banner', () => {
        expect(page.querySelector('[test-id="banner"]')).not.toBeNull();
      })

      it('then show error message', () => {
        expect(messageService._hasShownError).toBeTruthy();
      })

    })

  })

  describe('given user clicks on save button', () => {

    beforeEach(() => {
      activatedRoute.value = 'new';
      fixture.detectChanges();
      
      store.dispatch(loadProductsSuccess({products: []}));
      fixture.detectChanges();

      component.form.get('productId')?.setValue('anyProductId');
      fixture.detectChanges();

      page.querySelector('[test-id="save-button"]').click();
      fixture.detectChanges();
    })

    it('then save', done => {
      store.select('bannerDetail').subscribe(state => {
        expect(state.isSaving).toBeTruthy();
        done();
      })
    })

    it('when saving, then save loader', () => {
      expect(page.querySelector('[test-id="save-loader"]')).not.toBeNull();
    })

    describe('when saved with success', () => {

      beforeEach(() => {
        spyOn(window.history, 'back');

        store.dispatch(saveBannerDetailSuccess());
        fixture.detectChanges();
      })

      it('then hide save loader', () => {
        expect(page.querySelector('[test-id="save-loader"]')).toBeNull();
      })

      it('then go to previous page', () => {
        expect(window.history.back).toHaveBeenCalled();
      })

    })

    describe('when error on save', () => {

      beforeEach(() => {
        const error = {error: "error"};
        store.dispatch(saveBannerDetailFail({error}));
        fixture.detectChanges();
      })

      it('then hide save loader', () => {
        expect(page.querySelector('[test-id="save-loader"]')).toBeNull();
      })

      it('then show error message', () => {
        expect(messageService._hasShownError).toBeTruthy();
      })

    })

  })

});
