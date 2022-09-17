import { TestBed } from "@angular/core/testing";
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable, of, throwError } from 'rxjs';
import { Action } from '@ngrx/store';
import { DailyPurchaseSummariesEffects } from './daily-purchase-summaries.effects';
import { EffectsModule } from "@ngrx/effects";
import { provideMockStore } from "@ngrx/store/testing";
import { loadDailyPurchaseSummaries, loadDailyPurchaseSummariesFail, loadDailyPurchaseSummariesSuccess } from "./daily-purchase-summaries.actions";
import { DailySummaryPurchaseService } from "src/app/services/daily-summary-purchase/daily-summary-purchase.service";

describe('DailyPurchaseSummariesEffects', () => {

    let actions$ = new Observable<Action>();
    let effects: DailyPurchaseSummariesEffects;
    let dailyPurchaseSummariesService: DailySummaryPurchasesServiceMock;

    const summaries = [{id: 1}] as any;
    const error = {error: "error"};

    beforeEach(() => {
        dailyPurchaseSummariesService = new DailySummaryPurchasesServiceMock();

        TestBed.configureTestingModule({
            imports: [
                EffectsModule.forRoot([]),
                EffectsModule.forFeature([DailyPurchaseSummariesEffects])
            ],
            providers: [
                DailyPurchaseSummariesEffects,
                provideMockStore({}),
                provideMockActions(() => actions$)
            ],
        })
        .overrideProvider(DailySummaryPurchaseService, {useValue: dailyPurchaseSummariesService});

        effects = TestBed.get(DailyPurchaseSummariesEffects);
    })

    describe("Given load daily purchase summaries", () => {

        beforeEach(() => {
            actions$ = of(loadDailyPurchaseSummaries({from: "any", until: "any"}));
        })

        it('when success, then return daily purchase summaries success', (done) => {
            dailyPurchaseSummariesService._response = of(summaries);
    
            effects.loadDailyPurchaseSummariesEffect$.subscribe(response => {
                expect(response).toEqual(loadDailyPurchaseSummariesSuccess({summaries}));
                done();
            })
        })
    
        it('when fail, then return daily purchase summaries fail', (done) => {
            dailyPurchaseSummariesService._response = throwError(error);
    
            effects.loadDailyPurchaseSummariesEffect$.subscribe(response => {
                expect(response).toEqual(loadDailyPurchaseSummariesFail({error}));
                done();
            })
        })

    })

});

export class DailySummaryPurchasesServiceMock {
    
    _response: any;

    find() {
        return this._response || of({});
    }
    
}