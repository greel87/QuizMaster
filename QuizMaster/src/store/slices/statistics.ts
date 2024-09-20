import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface StatisticsState {
  totalNumberOfQuestions: number;
  numberOfCorrectQuestions: number;
  totalCategoryQuestions: Record<string, number>;
  totalDifficultyQuestions: Record<string, number>;
  totalTypeQuestions: Record<string, number>;
}

const initialState: StatisticsState = {
  totalNumberOfQuestions: 0,
  numberOfCorrectQuestions: 0,
  totalCategoryQuestions: {},
  totalDifficultyQuestions: {},
  totalTypeQuestions: {},
};

interface UpdateStatisticsPayload {
  totalQuestions: number;
  rightAnswers: number;
  category: string;
  difficulty: string;
  type: string;
}

const statisticsSlice = createSlice({
  name: 'statistics',
  initialState,
  reducers: {
    updateStatistics: (state, action: PayloadAction<UpdateStatisticsPayload>) => {
      const { totalQuestions, rightAnswers, category, difficulty, type } = action.payload;
      
      state.totalNumberOfQuestions += totalQuestions;
      state.numberOfCorrectQuestions += rightAnswers;
      state.totalCategoryQuestions[category] = (state.totalCategoryQuestions[category] || 0) + totalQuestions;
      state.totalDifficultyQuestions[difficulty] = (state.totalDifficultyQuestions[difficulty] || 0) + totalQuestions;
      state.totalTypeQuestions[type] = (state.totalTypeQuestions[type] || 0) + totalQuestions;
    },
  },
});

export const { updateStatistics } = statisticsSlice.actions;
export const statisticsReducer = statisticsSlice.reducer;

export type { StatisticsState };
