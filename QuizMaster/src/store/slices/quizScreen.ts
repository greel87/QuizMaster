import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"

const initialState = {
  list: [],
  loading: false,
  currentQuestion: 0,
  answers: [],
  time: 0
}

export const selectQuestions = (state) => state.quiz?.list ?? []
export const selectIsQuestionsLoading = (state) => state.quiz.loading
export const selectCurrentQuestion = (state) => state.quiz.currentQuestion
export const selectAnswers = (state) => state.quiz.answers ?? []
export const selectAmountOfQuestions = (state) => state.quiz.list.length
export const selectTimeQuestions = (state) => state.quiz.time



export const fetchQuestions = createAsyncThunk(
  'fetchQuestions',
  async ({numberOfQuestions, type, difficulty, categories}) => {
    let url = `https://opentdb.com/api.php?amount=${numberOfQuestions}`

    if (type !== '-1') {
      url = url.concat(`&type=${type}`)
    }

    if (difficulty !== '-1') {
      url = url.concat(`&difficulty=${difficulty}`)
    }

    if (categories !== -1) {
      url = url.concat(`&category=${categories}`)
    }

    const result = await fetch(url)
    const data = await result.json()
    
    if (data && 'results' in data) {
      return data.results
    }

    return []
  }
)

const quizSlice = createSlice({
  name: 'quiz',
  initialState,
  reducers: {
    answer: (state, action) => {
      state.currentQuestion = state.currentQuestion + 1
      state.answers.push(action.payload)
    },
    resetQuestions: (state) => {
      return { ...initialState };
    },
    setTime: (state, action) => {
      state.time = action.payload * 60 * 1000
    }
},
  extraReducers: (builder) => {
    builder.addCase(fetchQuestions.pending, (state) => {
      state.loading = true
    })
    builder.addCase(fetchQuestions.fulfilled, (state, action) => {
      state.loading = false
      state.list = action.payload
    })
    builder.addCase(fetchQuestions.rejected, (state) => {
      state.loading = false
    })
  }
})
export const {answer, resetQuestions, setTime} = quizSlice.actions

export const quizReducer = quizSlice.reducer

