import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  resultState: {
    type: null,
    category: null,
    difficulty: null,
    totalQuestions: null,
    rightAnswers: null,
    timeTaken: null,
    totalTime: null
  }
}

export const selectResultState = (state) => state.results.resultState

const resultsSlice = createSlice({
    name: 'results',
    initialState,
    reducers: {
       setResults: (state, action) => {
        state.resultState = action.payload
        },
        resetResults: (state) => {
          state.resultState = initialState
        }
    }
})
  
  export const {setResults, resetResults} = resultsSlice.actions
  
  export const resultReducer = resultsSlice.reducer