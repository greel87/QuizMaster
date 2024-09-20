import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../index";

interface ResultState {
  type: string | null;
  category: string | null;
  difficulty: string | null;
  totalQuestions: number | null;
  rightAnswers: number | null;
  timeTaken: number | null;
  totalTime: number | null;
}

interface ResultsState {
  resultState: ResultState;
}

const initialState: ResultsState = {
  resultState: {
    type: null,
    category: null,
    difficulty: null,
    totalQuestions: null,
    rightAnswers: null,
    timeTaken: null,
    totalTime: null
  }
};

export const selectResultState = (state: RootState) => state.results.resultState;

const resultsSlice = createSlice({
  name: 'results',
  initialState,
  reducers: {
    setResults: (state, action: PayloadAction<ResultState>) => {
      state.resultState = action.payload;
    },
    resetResults: (state) => {
      state.resultState = initialState.resultState;
    }
  }
});

export const { setResults, resetResults } = resultsSlice.actions;

export const resultReducer = resultsSlice.reducer;

export type { ResultsState };