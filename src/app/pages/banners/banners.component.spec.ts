import { Location } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog } from '@angular/material/dialog';
import { RouterTestingModule } from '@angular/router/testing';
import { Store, StoreModule } from '@ngrx/store';
import { MessageService } from 'src/app/services/message/message.service';
import { AppState } from 'src/app/store/app-state';
import { BlankComponent } from 'src/mock/blank-component/blank.component.mock';
import { MatDialogMock } from 'src/mock/mat-dialog.mock';
import { MessageServiceMock } from 'src/mock/message-service.mock';
import { PageMock } from 'src/mock/page.mock';
import { BannersComponent } from './banners.component';
import { BannersModule } from './banners.module';
import { loadBannersFail, loadBannersSuccess, removeBannerSuccess } from './store/banners.actions';
import { bannersReducer } from './store/banners.reducers';

describe('BannersComponent', () => {
  let component: BannersComponent;
  let fixture: ComponentFixture<BannersComponent>;
  let store: Store<AppState>;
  let page: PageMock;
  let location: Location;
  let messageService: MessageServiceMock;
  let dialog: MatDialogMock;

  beforeEach(async () => {
    dialog = new MatDialogMock();
    messageService = new MessageServiceMock();

    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([
          { path: 'banners/:uid', component: BlankComponent }
        ]),
        BannersModule,
        StoreModule.forRoot([]),
        StoreModule.forFeature('banners', bannersReducer)
      ]
    })
    .overrideProvider(MatDialog, {useValue: dialog})
    .overrideProvider(MessageService, {useValue: messageService})
    .compileComponents();

    fixture = TestBed.createComponent(BannersComponent);
    store = TestBed.inject(Store);
    location = TestBed.inject(Location);

    component = fixture.componentInstance;
    page = fixture.debugElement.nativeElement;

    fixture.detectChanges();
  });

  it('given page starts, then load banners', done => {
    store.select('banners').subscribe(state => {
      expect(state.isLoading).toBeTruthy();
      done();
    })
  })

  describe('given loading banners', () => {

    it('then show banners loader', () => {
      expect(page.querySelector('[test-id="banners-loader"]')).not.toBeNull();
    })
  
    it('then hide banners', () => {
      expect(page.querySelector('[test-id="banners"]')).toBeNull();
    })

  })

  describe('given banners loaded', () => {

    beforeEach(() => {
      const banners = [{id: 1, product: {name: "anyProduct"}}] as any;
      store.dispatch(loadBannersSuccess({banners}));
      fixture.detectChanges();
    })

    it('then hide banners loader', () => {
      expect(page.querySelector('[test-id="banners-loader"]')).toBeNull();
    })
  
    it('then show banners', () => {
      expect(page.querySelector('[test-id="banners"]')).not.toBeNull();
    })
  
    it('then hide no results found', () => {
      expect(page.querySelector('[test-id="no-results-found"]')).toBeNull();
    })
  
    it('when no banners loaded, then show no results found', () => {
      store.dispatch(loadBannersSuccess({banners: []}));
      fixture.detectChanges();

      expect(page.querySelector('[test-id="no-results-found"]')).not.toBeNull();
    })

    it('when user clicks on add banner button, then go to new banner page', done => {
      page.querySelector('[test-id="add-banner-button"]').click();
      fixture.detectChanges();

      setTimeout(() => {
        expect(location.path()).toEqual('/banners/new');
        done();
      }, 100);
    })

    it('when user clicks on banner, then go to banner detail page', done => {
      page.querySelectorAll('table tbody tr')[0].click();
      fixture.detectChanges();

      setTimeout(() => {
        expect(location.path()).toEqual('/banners/1');
        done();
      }, 100);
    })

    it('when user clicks to remove banner, then show confirm dialog', () => {
      page.querySelector('[test-id="remove-banner-button"]').click();
      fixture.detectChanges();

      expect(dialog.hasOpened).toBeTruthy();
    })

    it('when user cancels banner deletion, then do not delete banner', done => {
      dialog.response = null;

      page.querySelector('[test-id="remove-banner-button"]').click();
      fixture.detectChanges();

      store.select('banners').subscribe(state => {
        expect(state.isRemoving).toBeFalsy();
        done();
      })
    })

    describe('when user confirms banner deletion', () => {

      beforeEach(() => {
        dialog.response = "YES";
  
        page.querySelector('[test-id="remove-banner-button"]').click();
        fixture.detectChanges();
      })

      it('then delete banner', done => {
        store.select('banners').subscribe(state => {
          expect(state.isRemoving).toBeTruthy();
          done();
        })
      })

      it('then show banners loader', () => {
        expect(page.querySelector('[test-id="banners-loader"]')).not.toBeNull();
      })

      it('then hide banners', () => {
        expect(page.querySelector('[test-id="banners"]')).toBeNull();
      })

    })

    describe('when banner removed', () => {

      beforeEach(() => {
        store.dispatch(removeBannerSuccess());
        fixture.detectChanges();
      })

      it('then hide banners loader', () => {
        expect(page.querySelector('[test-id="banners-loader"]')).toBeNull();
      })

      it('then show banners', () => {
        expect(page.querySelector('[test-id="banners"]')).not.toBeNull();
      })

    })

  })

  describe('given error on load banner', () => {

    beforeEach(() => {
      const error = {error: "error"} as any;
      store.dispatch(loadBannersFail({error}));
      fixture.detectChanges();
    })

    it('then show error', () => {
      expect(messageService._hasShownError).toBeTruthy();
    })

  })

});
