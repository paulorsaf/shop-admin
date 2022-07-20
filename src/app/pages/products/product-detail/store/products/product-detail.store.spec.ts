import { AppInitialState } from "src/app/store/app-initial-state";
import { clear, loadDetail, loadDetailFail, loadDetailSuccess, loadStock, loadStockFail, loadStockSuccess, removeImage, removeImageFail, removeImageSuccess, removeStock, removeStockFail, removeStockSuccess, resetFlags, saveDetail, saveDetailFail, saveDetailSuccess, saveStockOption, saveStockOptionFail, saveStockOptionSuccess, updateStockOption, updateStockOptionFail, updateStockOptionSuccess, uploadImage, uploadImageFail, uploadImageSuccess } from "./product-detail.actions";
import { productDetailReducer } from "./product-detail.reducers";
import { ProductDetailState } from "./product-detail.state";

fdescribe('Product store', () => {
    
    it('loadDetail', () => {
        const initialState: ProductDetailState = {
            ...AppInitialState.productDetail,
            error: {},
            isLoaded: true,
            isLoading: false,
            product: {} as any
        };

        const state = productDetailReducer(initialState, loadDetail({id: '1'}));

        expect(state).toEqual({
            ...AppInitialState.productDetail,
            error: null,
            isLoaded: false,
            isLoading: true,
            product: undefined
        });
    });
    
    it('loadDetailSuccess', () => {
        const initialState: ProductDetailState = {
            ...AppInitialState.productDetail,
            isLoaded: false,
            isLoading: true
        };

        const product = {id: 1} as any;
        const state = productDetailReducer(initialState, loadDetailSuccess({product}));

        expect(state).toEqual({
            ...AppInitialState.productDetail,
            isLoaded: true,
            isLoading: false,
            product
        });
    });
    
    it('loadDetailFail', () => {
        const initialState: ProductDetailState = {
            ...AppInitialState.productDetail,
            isLoaded: false,
            isLoading: true
        };

        const error = {error: "error"};
        const state = productDetailReducer(initialState, loadDetailFail({error}));

        expect(state).toEqual({
            ...AppInitialState.productDetail,
            error,
            isLoaded: false,
            isLoading: false
        });
    });
    
    it('saveDetail', () => {
        const initialState: ProductDetailState = {
            ...AppInitialState.productDetail,
            error: {},
            isSaved: true,
            isSaving: false
        };

        const product = {id: 1} as any;
        const state = productDetailReducer(initialState, saveDetail({product}));

        expect(state).toEqual({
            ...AppInitialState.productDetail,
            error: null,
            isSaved: false,
            isSaving: true
        });
    });
    
    it('saveDetailSuccess', () => {
        const initialState: ProductDetailState = {
            ...AppInitialState.productDetail,
            isSaved: false,
            isSaving: true
        };

        const state = productDetailReducer(initialState, saveDetailSuccess());

        expect(state).toEqual({
            ...AppInitialState.productDetail,
            isSaved: true,
            isSaving: false
        });
    });
    
    it('saveDetailFail', () => {
        const initialState: ProductDetailState = {
            ...AppInitialState.productDetail,
            isSaved: false,
            isSaving: true
        };

        const error = {error: "error"};
        const state = productDetailReducer(initialState, saveDetailFail({error}));

        expect(state).toEqual({
            ...AppInitialState.productDetail,
            error,
            isSaved: false,
            isSaving: false
        });
    });
    
    it('loadStock', () => {
        const initialState: ProductDetailState = {
            ...AppInitialState.productDetail,
            error: {},
            isLoadedStock: true,
            isLoadingStock: false,
            isSavedStock: true,
            isSavingStock: true,
            stock: [{}] as any
        };

        const state = productDetailReducer(initialState, loadStock({id: '1'}));

        expect(state).toEqual({
            ...AppInitialState.productDetail,
            error: null,
            isLoadedStock: false,
            isLoadingStock: true,
            isSavedStock: false,
            isSavingStock: false,
            stock: undefined
        });
    });
    
    it('loadStockSuccess', () => {
        const initialState: ProductDetailState = {
            ...AppInitialState.productDetail,
            isLoadingStock: true
        };

        const stock = [{}, {}] as any;
        const state = productDetailReducer(initialState, loadStockSuccess({stock}));

        expect(state).toEqual({
            ...AppInitialState.productDetail,
            isLoadedStock: true,
            isLoadingStock: false,
            stock
        });
    });
    
    it('loadStockFail', () => {
        const initialState: ProductDetailState = {
            ...AppInitialState.productDetail,
            isLoadingStock: true
        };

        const error = {error: "error"};
        const state = productDetailReducer(initialState, loadStockFail({error}));

        expect(state).toEqual({
            ...AppInitialState.productDetail,
            error,
            isLoadedStock: false,
            isLoadingStock: false
        });
    });
    
    it('saveStockOption', () => {
        const initialState: ProductDetailState = {
            ...AppInitialState.productDetail,
            error: {},
            isSavedStock: true,
            isSavingStock: false
        };

        const stock = {id: 1} as any;
        const state = productDetailReducer(initialState, saveStockOption({stock}));

        expect(state).toEqual({
            ...AppInitialState.productDetail,
            error: null,
            isSavedStock: false,
            isSavingStock: true,
        });
    });
    
    it('saveStockOptionSuccess', () => {
        const initialState: ProductDetailState = {
            ...AppInitialState.productDetail,
            isSavingStock: true
        };

        const state = productDetailReducer(initialState, saveStockOptionSuccess());

        expect(state).toEqual({
            ...AppInitialState.productDetail,
            isSavedStock: true,
            isSavingStock: false,
        });
    });
    
    it('saveStockOptionFail', () => {
        const initialState: ProductDetailState = {
            ...AppInitialState.productDetail,
            isSavingStock: true
        };

        const error = {error: "error"};
        const state = productDetailReducer(initialState, saveStockOptionFail({error}));

        expect(state).toEqual({
            ...AppInitialState.productDetail,
            error,
            isSavedStock: false,
            isSavingStock: false
        });
    });
    
    it('uploadImage', () => {
        const initialState: ProductDetailState = {
            ...AppInitialState.productDetail,
            error: {},
            isUploadedImage: true,
            isUploadingImage: false
        };

        const state = productDetailReducer(initialState, uploadImage({image: {id: 1} as any}));

        expect(state).toEqual({
            ...AppInitialState.productDetail,
            error: null,
            isUploadedImage: false,
            isUploadingImage: true,
        });
    });
    
    it('uploadImageSuccess', () => {
        const initialState: ProductDetailState = {
            ...AppInitialState.productDetail,
            isUploadingImage: true
        };

        const state = productDetailReducer(initialState, uploadImageSuccess());

        expect(state).toEqual({
            ...AppInitialState.productDetail,
            isUploadedImage: true,
            isUploadingImage: false
        });
    });
    
    it('uploadImageFail', () => {
        const initialState: ProductDetailState = {
            ...AppInitialState.productDetail,
            isUploadingImage: true
        };

        const error = {error: "error"};
        const state = productDetailReducer(initialState, uploadImageFail({error}));

        expect(state).toEqual({
            ...AppInitialState.productDetail,
            error,
            isUploadedImage: false,
            isUploadingImage: false
        });
    });
    
    it('removeStock', () => {
        const initialState: ProductDetailState = {
            ...AppInitialState.productDetail,
            error: {},
            isRemovedStock: true,
            isRemovingStock: false
        };

        const state = productDetailReducer(initialState, removeStock({stockOption: {id: 1} as any}));

        expect(state).toEqual({
            ...AppInitialState.productDetail,
            error: null,
            isRemovedStock: false,
            isRemovingStock: true
        });
    });
    
    it('removeStockSuccess', () => {
        const initialState: ProductDetailState = {
            ...AppInitialState.productDetail,
            isRemovingStock: true
        };

        const state = productDetailReducer(initialState, removeStockSuccess());

        expect(state).toEqual({
            ...AppInitialState.productDetail,
            isRemovedStock: true,
            isRemovingStock: false
        });
    });
    
    it('removeStockFail', () => {
        const initialState: ProductDetailState = {
            ...AppInitialState.productDetail,
            isRemovingStock: true
        };

        const error = {error: "error"};
        const state = productDetailReducer(initialState, removeStockFail({error}));

        expect(state).toEqual({
            ...AppInitialState.productDetail,
            error,
            isRemovedStock: false,
            isRemovingStock: false
        });
    });
    
    it('clear', () => {
        const initialState: ProductDetailState = {
            ...AppInitialState.productDetail,
            error: {},
            isLoaded: true,
            isLoading: true,
            isSaved: true,
            isSaving: true,
            product: {} as any
        };

        const state = productDetailReducer(initialState, clear());

        expect(state).toEqual({
            ...AppInitialState.productDetail
        });
    });
    
    it('updateStockOption', () => {
        const initialState: ProductDetailState = {
            ...AppInitialState.productDetail,
            error: {},
            isUpdatedStock: true,
            isUpdatingStock: false
        };

        const state = productDetailReducer(initialState, updateStockOption({stockOption: {id: 1} as any}));

        expect(state).toEqual({
            ...AppInitialState.productDetail,
            error: null,
            isUpdatedStock: false,
            isUpdatingStock: true
        });
    });
    
    it('updateStockOptionSuccess', () => {
        const initialState: ProductDetailState = {
            ...AppInitialState.productDetail,
            isUpdatingStock: true
        };

        const state = productDetailReducer(initialState, updateStockOptionSuccess());

        expect(state).toEqual({
            ...AppInitialState.productDetail,
            isUpdatedStock: true,
            isUpdatingStock: false
        });
    });
    
    it('updateStockOptionFail', () => {
        const initialState: ProductDetailState = {
            ...AppInitialState.productDetail,
            isUpdatingStock: true
        };

        const error = {error: "error"};
        const state = productDetailReducer(initialState, updateStockOptionFail({error}));

        expect(state).toEqual({
            ...AppInitialState.productDetail,
            error,
            isUpdatedStock: false,
            isUpdatingStock: false
        });
    });
    
    it('resetFlags', () => {
        const initialState: ProductDetailState = {
            ...AppInitialState.productDetail,
            isEditedStock: true,
            isEditingStock: true,
            isRemovedStock: true,
            isRemovingStock: true,
            isSavedStock: true,
            isSavingStock: true,
            isUpdatedStock: true,
            isUpdatingStock: true
        };

        const state = productDetailReducer(initialState, resetFlags());

        expect(state).toEqual({
            ...AppInitialState.productDetail,
            isEditedStock: false,
            isEditingStock: false,
            isRemovedStock: false,
            isRemovingStock: false,
            isSavedStock: false,
            isSavingStock: false,
            isUpdatedStock: false,
            isUpdatingStock: false
        });
    });
    
    it('removeImage', () => {
        const initialState: ProductDetailState = {
            ...AppInitialState.productDetail,
            error: {},
            isRemovedImage: true,
            isRemovingImage: false
        };

        const image = {id: 1} as any;
        const state = productDetailReducer(initialState, removeImage({image}));

        expect(state).toEqual({
            ...AppInitialState.productDetail,
            error: null,
            isRemovedImage: false,
            isRemovingImage: true
        });
    });
    
    it('removeImageSuccess', () => {
        const initialState: ProductDetailState = {
            ...AppInitialState.productDetail,
            isRemovingImage: true
        };

        const state = productDetailReducer(initialState, removeImageSuccess());

        expect(state).toEqual({
            ...AppInitialState.productDetail,
            isRemovedImage: true,
            isRemovingImage: false
        });
    });
    
    it('removeImageFail', () => {
        const initialState: ProductDetailState = {
            ...AppInitialState.productDetail,
            isRemovingImage: true
        };

        const error = {error: "error"};
        const state = productDetailReducer(initialState, removeImageFail({error}));

        expect(state).toEqual({
            ...AppInitialState.productDetail,
            error,
            isRemovedImage: false,
            isRemovingImage: false
        });
    });
  
});