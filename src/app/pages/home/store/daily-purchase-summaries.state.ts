import { DailyPurchaseSummary } from "src/app/model/purchase-summary/daily-purchase-summary";

export type DailyPurchaseSummariesState = {
    error: any;
    isLoaded: boolean;
    isLoading: boolean;
    dailyPurchaseSummaries: DailyPurchaseSummary[];
}