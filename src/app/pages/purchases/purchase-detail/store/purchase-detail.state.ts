import { Purchase } from "src/app/model/purchase/purchase";

export type PurchaseDetailState = {
    error: any;
    isCanceledProduct: boolean;
    isCancelingProduct: boolean;
    isEditedProduct: boolean;
    isEditingProduct: boolean;
    isLoaded: boolean;
    isLoading: boolean;
    isUpdated: boolean;
    isUpdating: boolean;
    isSentToSystem: boolean;
    isSendingToSystem: boolean;
    purchase?: Purchase;
}