import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { difficultyOptions, numberOfQuestionsOptions, timeOptions, typeOptions } from "../../constants";

 const initialState = {
    config: {
        numberOfQuestions: numberOfQuestionsOptions,
        time: timeOptions,
        difficulty: difficultyOptions,
        type: typeOptions,
        categories: [{}],
    },
    selectedConfig: {
        numberOfQuestions: null,
        time: null,
        difficulty: null,
        type: null,
        categories: null
    }
 }

export const selectConfig = (state) => state.settings.config
export const selectSelectedConfig = (state) => state.settings.selectedConfig

export const fetchCategories = createAsyncThunk(
    'fetchCategories',
    async () => {
      const result = await fetch('https://opentdb.com/api_category.php')
      const data = await result.json()
  
      if (data && 'trivia_categories' in data) {
        return data.trivia_categories
      }
  
      return []
    }
  )
  
  const configurationSlice = createSlice({
    name: 'configuration',
    initialState,
    reducers: {
      setConfig: (state, action) => {
        state.selectedConfig = action.payload
      },
      resetConfig: (state) => {
        state.selectedConfig = initialState.selectedConfig
        state.config = initialState.config
      }
    },
    extraReducers: (builder) => {
      builder.addCase(fetchCategories.fulfilled, (state, action) => {
        state.config.categories = [{id: -1, name: 'Any'}, ...action.payload]
      })
    }
  })
  
  export const {setConfig, resetConfig} = configurationSlice.actions
  
  export const configReducer = configurationSlice.reducer