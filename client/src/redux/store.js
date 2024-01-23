import { configureStore, combineReducers } from "@reduxjs/toolkit";
import userReducer from "./user/userSlice";
import themeReducer from "./theme/themeSlice";
import { persistReducer,persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";

const rootReducer = combineReducers({
  user: userReducer,
  theme:themeReducer
});

const config = {
  key: "root",
  storage,
  version: 1,
};

const persestReducer = persistReducer(config, rootReducer);

export const store = configureStore({
  reducer: persestReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});


export const persistStor = persistStore(store)