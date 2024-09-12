import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  totalNumberOfQuestions: 0,
  numberOfCorrectQuestions: 0,
  totalCategoryQuestions: {},
  totalDifficultyQuestions: {},
  totalTypeQuestions: {},
};

const statisticsSlice = createSlice({
  name: 'statistics',
  initialState,
  reducers: {
    updateStatistics: (state, action) => {
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