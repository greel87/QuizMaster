import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    resultState: {
      type: null,
      category: null,
      dificulty: null,
      totalQuestions: null,
      rightAnswers: null
    }
}

export const selectResultState = (state) => state.results.resultState

const resultsSlice = createSlice({
    name: 'results',
    initialState,
    reducers: {
       setResults: (state, action) => {
        state.resultState = action.payload
      }
    }
})
  
  export const {setResults} = resultsSlice.actions
  
  export const resultReducer = resultsSlice.reducer