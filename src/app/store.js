import { configureStore } from "@reduxjs/toolkit";
import breedReducer from "../features/breeds/breedSlice";
import {
    persistStore,
    persistReducer,
    FLUSH,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
    REHYDRATE,
} from "redux-persist";

const storage = {
    getItem: (key) => {
        if (typeof window === "undefined") {
            return Promise.resolve(null);
        }
        return Promise.resolve(localStorage.getItem(key));
    },
    setItem: (key, value) => {
        if (typeof window === "undefined") {
            return Promise.resolve();
        }
        localStorage.setItem(key, value);
        return Promise.resolve();
    },
    removeItem: (key) => {
        if (typeof window === "undefined") {
            return Promise.resolve();
        }
        localStorage.removeItem(key);
        return Promise.resolve();
    },
};

const persistConfig = {
    key: "breeds",
    storage,
    whitelist: ["breeds"],
};

const persistedBreedReducer = persistReducer(
    persistConfig,
    breedReducer
);

export const store = configureStore({
    reducer: {
        breeds: persistedBreedReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [
                    FLUSH,
                    REHYDRATE,
                    PAUSE,
                    PERSIST,
                    PURGE,
                    REGISTER,
                ],
            },
        }),
});

export const persistor = persistStore(store);