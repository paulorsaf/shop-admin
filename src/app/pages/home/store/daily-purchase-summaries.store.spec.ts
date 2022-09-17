import { AppInitialState } from "src/app/store/app-initial-state";
import { loadDailyPurchaseSummaries, loadDailyPurchaseSummariesFail, loadDailyPurchaseSummariesSuccess } from "./daily-purchase-summaries.actions";
import { dailyPurchaseSummariesReducer } from "./daily-purchase-summaries.reducers";
import { DailyPurchaseSummariesState } from "./daily-purchase-summaries.state";

describe('Daily purchase summaries store', () => {
    
    it('loadDailyPurchaseSummaries', () => {
        const initialState: DailyPurchaseSummariesState = {
            ...AppInitialState.dailyPurchaseSummaries,
            dailyPurchaseSummaries: [{}] as any,
            error: {},
            isLoaded: true,
            isLoading: false
        };

        const from = "from";
        const until = "until";
        const state = dailyPurchaseSummariesReducer(
            initialState, loadDailyPurchaseSummaries({from, until})
        );

        expect(state).toEqual({
            ...AppInitialState.dailyPurchaseSummaries,
            dailyPurchaseSummaries: [],
            error: null,
            isLoaded: false,
            isLoading: true
        });
    });
    
    it('loadDailyPurchaseSummariesSuccess', () => {
        const initialState: DailyPurchaseSummariesState = {
            ...AppInitialState.dailyPurchaseSummaries,
            isLoading: true
        };

        const summaries = [{id: 1}] as any;
        const state = dailyPurchaseSummariesReducer(
            initialState, loadDailyPurchaseSummariesSuccess({summaries})
        );

        expect(state).toEqual({
            ...AppInitialState.dailyPurchaseSummaries,
            dailyPurchaseSummaries: summaries,
            isLoaded: true,
            isLoading: false
        });
    });
    
    it('loadDailyPurchaseSummariesFail', () => {
        const initialState: DailyPurchaseSummariesState = {
            ...AppInitialState.dailyPurchaseSummaries,
            isLoading: true
        };

        const error = {error: "error"};
        const state = dailyPurchaseSummariesReducer(
            initialState, loadDailyPurchaseSummariesFail({error})
        );

        expect(state).toEqual({
            ...AppInitialState.dailyPurchaseSummaries,
            error,
            isLoaded: false,
            isLoading: false
        });
    });
  
});