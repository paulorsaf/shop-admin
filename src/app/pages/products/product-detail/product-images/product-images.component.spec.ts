import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Store, StoreModule } from '@ngrx/store';
import { AppState } from 'src/app/store/app-state';
import { PageMock } from 'src/mock/page.mock';
import { ProductsModule } from '../../products.module';
import { loadDetail, loadDetailSuccess, uploadImage } from '../store/products/product-detail.actions';
import { productDetailReducer } from '../store/products/product-detail.reducers';
import { ProductImagesComponent } from './product-images.component';

describe('ProductImagesComponent', () => {
  let component: ProductImagesComponent;
  let fixture: ComponentFixture<ProductImagesComponent>;
  let store: Store<AppState>;
  let page: PageMock;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ProductsModule,
        StoreModule.forRoot([]),
        StoreModule.forFeature('productDetail', productDetailReducer)
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductImagesComponent);
    store = TestBed.inject(Store);

    component = fixture.componentInstance;
    page = fixture.debugElement.nativeElement;

    store.dispatch(loadDetail({id: '1'}));
    fixture.detectChanges();
  });

  describe('given loading images', () => {

    it('then show loader', () => {
      expect(page.querySelector('[test-id="images-loader"]')).not.toBeNull();
    })
  
    it('then hide images', () => {
      expect(page.querySelector('[test-id="images-form"]')).toBeNull();
    })

  })

  describe('given images loaded', () => {

    beforeEach(() => {
      dispatchLoadDetails();
    })

    it('then hide loader', () => {
      expect(page.querySelector('[test-id="images-loader"]')).toBeNull();
    })

    it('then show images', () => {
      expect(page.querySelector('[test-id="images-form"]')).not.toBeNull();
    })

    describe('when product has images', () => {

      it('then hide no images message', () => {
        expect(page.querySelector('[test-id="no-results-found"]')).toBeNull();
      })

      it('then show images list', () => {
        expect(page.querySelector('[test-id="images"]')).not.toBeNull();
      })

    })

    describe('when product doesnt have images', () => {

      beforeEach(() => {
        const product = {} as any;
        store.dispatch(loadDetailSuccess({product}));
        fixture.detectChanges();
      })

      it('then show no images message', () => {
        expect(page.querySelector('[test-id="no-results-found"]')).not.toBeNull();
      })

      it('then hide images list', () => {
        expect(page.querySelector('[test-id="images"]')).toBeNull();
      })

    })

  })

  describe('given user clicks on add image button', () => {

    beforeEach(() => {
      dispatchLoadDetails();

      page.querySelector('[test-id="add-image-button"]').click();
      fixture.detectChanges();
    })

    it('when image selected, then upload image', done => {
      component.uploadImage({target: {files: ['file1']}});
      fixture.detectChanges();

      store.select('productDetail').subscribe(state => {
        expect(state.isUploadingImage).toBeTruthy();
        done();
      })
    })

    describe('when uploading image', () => {

      beforeEach(() => {
        store.dispatch(uploadImage({image: {} as any}));
        fixture.detectChanges();
      })

      it('then show upload image loader', () => {
        expect(page.querySelector('[test-id="add-image-button-loader"]')).not.toBeNull();
      })

    })

  })

  function dispatchLoadDetails() {
    const product = {images: ['image1', 'image2']} as any;
    store.dispatch(loadDetailSuccess({product}));
    fixture.detectChanges();
  }

});
