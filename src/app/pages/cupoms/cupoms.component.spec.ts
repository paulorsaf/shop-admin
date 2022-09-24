import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog } from '@angular/material/dialog';
import { Store, StoreModule } from '@ngrx/store';
import { AppState } from 'src/app/store/app-state';
import { MatDialogMock } from 'src/mock/mat-dialog.mock';
import { PageMock } from 'src/mock/page.mock';
import { CupomsComponent } from './cupoms.component';
import { CupomsModule } from './cupoms.module';
import { loadCupomsSuccess } from './store/cupoms.actions';
import { cupomsReducer } from './store/cupoms.reducers';

describe('CupomsComponent', () => {
  let component: CupomsComponent;
  let fixture: ComponentFixture<CupomsComponent>;
  let store: Store<AppState>;
  let page: PageMock;
  let dialog: MatDialogMock;

  beforeEach(async () => {
    dialog = new MatDialogMock();
    
    await TestBed.configureTestingModule({
      imports: [
        CupomsModule,
        StoreModule.forRoot([]),
        StoreModule.forFeature('cupoms', cupomsReducer)
      ]
    })
    .overrideProvider(MatDialog, {useValue: dialog})
    .compileComponents();

    fixture = TestBed.createComponent(CupomsComponent);
    store = TestBed.inject(Store);

    component = fixture.componentInstance;
    page = fixture.debugElement.nativeElement;

    fixture.detectChanges();
  });

  describe('given page starts', () => {

    it('then load cupoms', done => {
      store.select('cupoms').subscribe(state => {
        expect(state.isLoading).toBeTruthy();
        done();
      })
    })

  })

  describe('given loading cupoms', () => {

    it('then show cupoms loader', () => {
      expect(page.querySelector('[test-id="cupoms-loader"]')).not.toBeNull();
    })

    it('then hide cupoms', () => {
      expect(page.querySelector('[test-id="cupoms"]')).toBeNull();
    })

  })

  describe('given cupoms loaded', () => {

    beforeEach(() => {
      const cupoms = [{id: 1}] as any;
      store.dispatch(loadCupomsSuccess({cupoms}))
      fixture.detectChanges();
    })

    it('then hide cupoms loader', () => {
      expect(page.querySelector('[test-id="cupoms-loader"]')).toBeNull();
    })

    it('then show cupoms', () => {
      expect(page.querySelector('[test-id="cupoms"]')).not.toBeNull();
    })

    it('when cupoms are empty, then show empty results', () => {
      const cupoms = [] as any;
      store.dispatch(loadCupomsSuccess({cupoms}))
      fixture.detectChanges();

      expect(page.querySelector('[test-id="empty-results"]')).not.toBeNull();
    })

  })

  describe('given user clicks on add cupom', () => {

    beforeEach(() => {
      const cupoms = [{id: 1}] as any;
      store.dispatch(loadCupomsSuccess({cupoms}))
      fixture.detectChanges();

      page.querySelector('[test-id="add-cupom-button"]').click();
      fixture.detectChanges();
    })
    
    it('then show add cupom page', () => {
      expect(dialog.hasOpened).toBeTruthy();
    })

  })

  xdescribe('given user clicks on cupom', () => {

    beforeEach(() => {
      const cupoms = [{id: 1}] as any;
      store.dispatch(loadCupomsSuccess({cupoms}))
      fixture.detectChanges();

      page.querySelector('[test-id="cupom"]').click();
      fixture.detectChanges();
    })
    
    it('then show edit cupom page', () => {
      expect(dialog.hasOpened).toBeTruthy();
    })

  })

});
