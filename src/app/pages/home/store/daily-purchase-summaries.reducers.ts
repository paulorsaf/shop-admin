import { createReducer, on } from '@ngrx/store';
import { AppInitialState } from 'src/app/store/app-initial-state';
import { loadDailyPurchaseSummaries, loadDailyPurchaseSummariesFail, loadDailyPurchaseSummariesSuccess } from './daily-purchase-summaries.actions';
import { DailyPurchaseSummariesState } from './daily-purchase-summaries.state';

const initialState: DailyPurchaseSummariesState = AppInitialState.dailyPurchaseSummaries;

const _dailyPurchaseSummariesReducer = createReducer(initialState,
    on(loadDailyPurchaseSummaries, (state) => ({
        ...state,
        dailyPurchaseSummaries: [],
        error: null,
        isLoaded: false,
        isLoading: true
    })),
    on(loadDailyPurchaseSummariesSuccess, (state, action) => ({
        ...state,
        dailyPurchaseSummaries: action.summaries,
        isLoaded: true,
        isLoading: false
    })),
    on(loadDailyPurchaseSummariesFail, (state, action) => ({
        ...state,
        error: action.error,
        isLoaded: false,
        isLoading: false
    }))
);
 
export function dailyPurchaseSummariesReducer(state: DailyPurchaseSummariesState, action: any) {
  return _dailyPurchaseSummariesReducer(state, action);
}