export const REQUEST_CATEGORIES = 'reference/REQUEST_CATEGORIES';
export const FETCH_CATEGORIES = 'reference/FETCH_CATEGORIES';
export const SHOW_CATEGORIES_LOADER = 'reference/SHOW_CATEGORIES_LOADER';
export const SET_CATEGORIES_ERROR = 'reference/SET_CATEGORIES_ERROR';

export const REQUEST_PRODUCTS = 'reference/REQUEST_PRODUCTS';
export const FETCH_PRODUCTS = 'reference/FETCH_PRODUCTS';
export const SHOW_PRODUCTS_LOADER = 'reference/SHOW_PRODUCTS_LOADER';
export const SET_PRODUCTS_ERROR = 'reference/SET_PRODUCTS_ERROR';

const initialState = {
  categories: [],
  isLoadingCategories: false,
  categoriesError: null,
  products: [],
  isLoadingProducts: false,
  productsError: null,
};

export default function referenceReducer(state = initialState, action) {
  switch (action.type) {
    case SHOW_CATEGORIES_LOADER:
      return { ...state, isLoadingCategories: action.payload };

    case SET_CATEGORIES_ERROR:
      return { ...state, categoriesError: action.error };

    case SET_PRODUCTS_ERROR:
      return { ...state, productsError: action.error };

    case FETCH_CATEGORIES:
      return { ...state, categories: action.payload };

    case FETCH_PRODUCTS:
      return { ...state, products: action.payload };

    default:
      return state;
  }
}

export function loadAllCategories() {
  return { type: REQUEST_CATEGORIES };
}
export function showCategoriesLoader(payload) {
  return { type: SHOW_CATEGORIES_LOADER, payload };
}
export function setCategoriesError(error) {
  return { type: SET_CATEGORIES_ERROR, error };
}

export function loadProducts(categoryId) {
  return { type: REQUEST_PRODUCTS, categoryId };
}
export function showProductsLoader(payload) {
  return { type: SHOW_PRODUCTS_LOADER, payload };
}
export function setProductsError(error) {
  return { type: SET_PRODUCTS_ERROR, error };
}

