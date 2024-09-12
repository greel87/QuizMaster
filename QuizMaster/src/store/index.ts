
import { configReducer } from "./slices/quizConfiguration";
import { quizReducer } from "./slices/quizScreen";
import { resultReducer } from "./slices/resultsScreen";
import { statisticsReducer } from "./slices/statistics";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import { configureStore } from "@reduxjs/toolkit";


const persistConfig = {
  key: 'statistics',
  storage,
};

const persistStatisticsReducer = persistReducer(persistConfig, statisticsReducer)

const storeConfig = configureStore({
  reducer: {
    settings: configReducer,
    quiz: quizReducer,
    results: resultReducer,
    statistics: persistStatisticsReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST'],
      },
    }),
}) 

export const store  = storeConfig
export const persistor = persistStore(storeConfig)