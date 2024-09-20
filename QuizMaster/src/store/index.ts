
import { configReducer, ConfigState } from "./slices/quizConfiguration";
import { quizReducer, QuizState } from "./slices/quizScreen";
import { resultReducer, ResultsState } from "./slices/resultsScreen";
import { statisticsReducer, StatisticsState } from "./slices/statistics";
import storage from "redux-persist/lib/storage";
import { PersistConfig, persistReducer, persistStore } from "redux-persist";
import { configureStore} from "@reduxjs/toolkit";

interface RootState {
  settings: ConfigState;
  quiz: QuizState;
  results: ResultsState;
  statistics: StatisticsState;
}

const persistConfig: PersistConfig<StatisticsState> = {
  key: 'statistics',
  storage,
};

const persistStatisticsReducer = persistReducer(persistConfig, statisticsReducer);

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
    }).concat() as ReturnType<typeof getDefaultMiddleware>,
});

export const store = storeConfig;
export const persistor = persistStore(storeConfig);

export type { RootState };
export type AppDispatch = typeof store.dispatch;