import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../index";
import { ConfigItem, difficultyOptions, numberOfQuestionsOptions, timeOptions, typeOptions } from "../../constants";

interface SelectedConfig {
  numberOfQuestions: string | null;
  time: string | null;
  difficulty: string | null;
  type: string | null;
  categories: string | null;
}

interface ConfigState {
  config: {
    numberOfQuestions: ConfigItem[];
    time: ConfigItem[];
    difficulty: ConfigItem[];
    type: ConfigItem[];
    categories: ConfigItem[];
  };
  selectedConfig: SelectedConfig;
}

const initialState: ConfigState = {
  config: {
    numberOfQuestions: numberOfQuestionsOptions,
    time: timeOptions,
    difficulty: difficultyOptions,
    type: typeOptions,
    categories: [],
  },
  selectedConfig: {
    numberOfQuestions: null,
    time: null,
    difficulty: null,
    type: null,
    categories: null
  }
};

export const selectConfig = (state: RootState) => state.settings.config;
export const selectSelectedConfig = (state: RootState) => state.settings.selectedConfig;

export const fetchCategories = createAsyncThunk(
  'fetchCategories',
  async () => {
    const result = await fetch('https://opentdb.com/api_category.php');
    const data = await result.json();

    if (data && 'trivia_categories' in data) {
      return data.trivia_categories;
    }

    return [];
  }
);

const configurationSlice = createSlice({
  name: 'configuration',
  initialState,
  reducers: {
    setConfig: (state, action: PayloadAction<Partial<SelectedConfig>>) => {
      state.selectedConfig = {
        ...state.selectedConfig,
        ...action.payload
      };
    },
    resetConfig: () => {
      return initialState;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCategories.fulfilled, (state, action) => {
      state.config.categories = [{id: -1, name: 'Any'}, ...action.payload];
    });
  }
});

export const { setConfig, resetConfig } = configurationSlice.actions;

export const configReducer = configurationSlice.reducer;

export type { ConfigState };