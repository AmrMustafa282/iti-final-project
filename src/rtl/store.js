import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import persistStore from "redux-persist/es/persistStore";
import cartReducer from "./slices/cartSlice";
import wishlistReducer from "./slices/wishlistSlice";

const rootReducer = combineReducers({
 cart: cartReducer,
 wishlist: wishlistReducer,
});

const persistConfig = {
 key: "root",
 storage,
 version: 1,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
 reducer: persistedReducer,
 middleware: (getDefaultMiddleware) =>
  getDefaultMiddleware({ serializableCheck: false }),
});

export const persistor = persistStore(store);

// import { configureStore } from "@reduxjs/toolkit";

// export const store = configureStore({
//  reducer: {
//   cart: cartReducer,
//  },
// });
