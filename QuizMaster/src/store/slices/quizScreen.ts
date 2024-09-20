import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../index";

interface QuizState {
  list: [];
  loading: boolean;
  currentQuestion: number;
  answers: boolean[];
  time: number;
}

const initialState: QuizState = {
  list: [],
  loading: false,
  currentQuestion: 0,
  answers: [],
  time: 0
};

export const selectQuestions = (state: RootState) => state.quiz?.list ?? [];
export const selectIsQuestionsLoading = (state: RootState) => state.quiz.loading;
export const selectCurrentQuestion = (state: RootState) => state.quiz.currentQuestion;
export const selectAnswers = (state: RootState) => state.quiz.answers ?? [];
export const selectAmountOfQuestions = (state: RootState) => state.quiz.list.length;
export const selectTimeQuestions = (state: RootState) => state.quiz.time;

interface FetchQuestionsParams {
  numberOfQuestions: number;
  type: string;
  difficulty: string;
  categories: number;
}

export const fetchQuestions = createAsyncThunk(
  'fetchQuestions',
  async ({ numberOfQuestions, type, difficulty, categories }: FetchQuestionsParams) => {
    let url = `https://opentdb.com/api.php?amount=${numberOfQuestions}`;

    if (type !== '-1') {
      url = url.concat(`&type=${type}`);
    }

    if (difficulty !== '-1') {
      url = url.concat(`&difficulty=${difficulty}`);
    }

    if (categories !== -1) {
      url = url.concat(`&category=${categories}`);
    }

    const result = await fetch(url);
    const data = await result.json();
    
    if (data && 'results' in data) {
      return data.results;
    }

    return [];
  }
);

const quizSlice = createSlice({
  name: 'quiz',
  initialState,
  reducers: {
    answer: (state, action: PayloadAction<boolean>) => {
      state.currentQuestion = state.currentQuestion + 1;
      state.answers.push(action.payload);
    },
    resetQuestions: () => {
      return { ...initialState };
    },
    setTime: (state, action: PayloadAction<number>) => {
      state.time = action.payload * 60 * 1000;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchQuestions.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchQuestions.fulfilled, (state, action) => {
      state.loading = false;
      state.list = action.payload;
    });
    builder.addCase(fetchQuestions.rejected, (state) => {
      state.loading = false;
    });
  }
});

export const { answer, resetQuestions, setTime } = quizSlice.actions;

export const quizReducer = quizSlice.reducer;

export type { QuizState };