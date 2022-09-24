import { Location } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Store, StoreModule } from '@ngrx/store';
import { MessageService } from 'src/app/services/message/message.service';
import { AppState } from 'src/app/store/app-state';
import { BlankComponent } from 'src/mock/blank-component/blank.component.mock';
import { MessageServiceMock } from 'src/mock/message-service.mock';
import { PageMock } from 'src/mock/page.mock';
import { HomeComponent } from './home.component';
import { HomeModule } from './home.module';
import { loadDailyPurchaseSummariesFail, loadDailyPurchaseSummariesSuccess } from './store/daily-purchase-summaries.actions';
import { dailyPurchaseSummariesReducer } from './store/daily-purchase-summaries.reducers';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let store: Store<AppState>;
  let page: PageMock;
  let messageService: MessageServiceMock;
  let location: Location;

  beforeEach(async () => {
    messageService = new MessageServiceMock();

    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([
          { path: 'purchases/:id', component: BlankComponent }
        ]),
        HomeModule,
        StoreModule.forRoot([]),
        StoreModule.forFeature('dailyPurchaseSummaries', dailyPurchaseSummariesReducer)
      ]
    })
    .overrideProvider(MessageService, {useValue: messageService})
    .compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    store = TestBed.inject(Store);
    location = TestBed.inject(Location);

    component = fixture.componentInstance;
    page = fixture.debugElement.nativeElement;

    fixture.detectChanges();
  });

  it('given page starts, then load purchase summaries', done => {
    store.select('dailyPurchaseSummaries').subscribe(state => {
      expect(state.isLoading).toBeTruthy();
      done();
    })
  });

  describe('given is loading summaries', () => {

    it('then show summaries loader', () => {
      expect(page.querySelector('[test-id="summaries-loader"]')).not.toBeNull();
    })

    it('then hide summaries', () => {
      expect(page.querySelector('[test-id="summaries"]')).toBeNull();
    })

  })

  describe('given summaries are loader', () => {

    beforeEach(() => {
      const summaries = [{id: 1}] as any;
      store.dispatch(loadDailyPurchaseSummariesSuccess({summaries}))
      fixture.detectChanges();
    })

    it('then hide summaries loader', () => {
      expect(page.querySelector('[test-id="summaries-loader"]')).toBeNull();
    })

    it('then show summaries', () => {
      expect(page.querySelector('[test-id="summaries"]')).not.toBeNull();
    })

    it('when empty summaries, then show empty results message', () => {
      const summaries = [] as any;
      store.dispatch(loadDailyPurchaseSummariesSuccess({summaries}))
      fixture.detectChanges();

      expect(page.querySelector('[test-id="empty-results"]')).not.toBeNull();
    })

    it('when user clicks on purchase, then go to purchase page', done => {
      page.querySelector('[test-id="purchase"]').click();
      fixture.detectChanges();

      setTimeout(() => {
        expect(location.path()).toEqual('/purchases/1');
        done();
      }, 100);
    })

  })

  describe('given error on load summaries', () => {

    beforeEach(() => {
      const error = {error: "error"};
      store.dispatch(loadDailyPurchaseSummariesFail({error}))
      fixture.detectChanges();
    })

    it('then show error message', () => {
      expect(messageService._hasShownError).toBeTruthy();
    })

  })

});
