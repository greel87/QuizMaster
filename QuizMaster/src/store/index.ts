import { configureStore } from "@reduxjs/toolkit";
import { configReducer } from "./slices/quizConfiguration";
import { quizReducer } from "./slices/quizScreen";
import { resultReducer } from "./slices/resultsScreen";


const storeConfig = {
  reducer: {
    settings: configReducer,
    quiz: quizReducer,
    results: resultReducer
  }
}

export const store = configureStore(storeConfig)