import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Store, StoreModule } from '@ngrx/store';
import { AppState } from 'src/app/store/app-state';
import { PageMock } from 'src/mock/page.mock';
import { loadClientsSuccess } from './store/clients.actions';
import { clientsReducer } from './store/clients.reducers';
import { ClientsComponent } from './clients.component';

describe('ClientsComponent', () => {
  let component: ClientsComponent;
  let fixture: ComponentFixture<ClientsComponent>;
  let store: Store<AppState>;
  let page: PageMock;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClientsComponent ],
      imports: [
        StoreModule.forRoot([]),
        StoreModule.forFeature('clients', clientsReducer)
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClientsComponent);
    store = TestBed.inject(Store);

    component = fixture.componentInstance;
    page = fixture.debugElement.nativeElement;
      
    fixture.detectChanges();
  });

  it('given page starts, then load clients', done => {
    store.select('clients').subscribe(state => {
      expect(state.isLoading).toBeTruthy();
      done();
    })
  });

  describe('given loading users', () => {

    it('then show users load', () => {
      expect(page.querySelector('[test-id="users-loader"]')).not.toBeNull();
    })

    it('then hide users', () => {
      expect(page.querySelector('[test-id="users"]')).toBeNull();
    })

  })

  describe('given users loaded', () => {

    beforeEach(() => {
      const clients = [{id: "anyUserId"}] as any;
      store.dispatch(loadClientsSuccess({clients}));
      fixture.detectChanges();
    })

    it('then hide users load', () => {
      expect(page.querySelector('[test-id="users-loader"]')).toBeNull();
    })

    it('then show users', () => {
      expect(page.querySelector('[test-id="users"]')).not.toBeNull();
    })

    it('when not users found, then show no results', () => {
      const clients = [] as any;
      store.dispatch(loadClientsSuccess({clients}));
      fixture.detectChanges();

      expect(page.querySelector('[test-id="no-results-found"]')).not.toBeNull();
    })

  })

});
