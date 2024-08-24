import { useReducer } from 'react';
import '../App.css'
import { mockQuizData } from './MockData';
//What context cna i use here
//can I move the states into a context

const initialState = {
    currentQuestion: 0,
    timeLeft: mockQuizData.totalTime,
    quizData: mockQuizData,
    isQuizEnded: false,
    timerId: null,
    userAnswers: [],
    score: 0
}

const reducer = (state, action) => {
    switch (action.type) {
        case 'nextQuestion':
            return {
                ...state,
                currentQuestion: state.currentQuestion + 1,
            }
        case 'startTimer':
            return {
                ...state,
                timerId: action.payload
            }
        case 'decrementTimer':
            if (state.timeLeft > 0) {
                return {
                    ...state,
                    timeLeft: state.timeLeft - 1,
                }
            } else {
                clearInterval(state.timerId);
                return {
                    ...state,
                    isQuizEnded: true,
                    timerId: null
                }
            }
        case 'endQuiz':
            clearInterval(state.timerId);
            return {
                ...state,
                isQuizEnded: true,
                timerId: null
            }
        case 'answerQuestion':
            { const isCorrect = action.payload === state.quizData.questions[state.currentQuestion].correctAnswer;
            return {
                ...state,
                userAnswers: [...state.userAnswers, action.payload],
                score: isCorrect ? state.score + 1 : state.score
            } }
        default:
            return state;
    }
}

export const QuizScreen = () => {
    const [state, dispatch] = useReducer(reducer, initialState);

    const startTimer = () => {
        if (!state.timerId) {
            const id = setInterval(() => {
                dispatch({ type: 'decrementTimer' });
            }, 1000);
            dispatch({ type: 'startTimer', payload: id });
        }
    }

    const nextQuestion = () => {
        if (state.currentQuestion < state.quizData.questions.length - 1) {
            dispatch({ type: 'nextQuestion' });
        } else {
            dispatch({ type: 'endQuiz' });
        }
    }

    const answerQuestion = (answer) => {
        dispatch({ type: 'answerQuestion', payload: answer });
        nextQuestion();
    }

    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
    }

    if (!state.timerId && !state.isQuizEnded) {
        startTimer();
    }

    const currentQuestion = state.quizData.questions[state.currentQuestion];
    const progress = (state.currentQuestion / state.quizData.questions.length) * 100;

    return (
        <div>
            <h1>React Quiz</h1>
            <div>Time Left: {formatTime(state.timeLeft)}</div>
            <div>
                <div>
                    <div style={{width: `${progress}%`,backgroundColor: '#4caf50',}}
                    ></div>
                </div>
                <div>Question {state.currentQuestion + 1} of {state.quizData.questions.length}</div>
            </div>
            {state.isQuizEnded ? (
                <div>
                    <h2>Quiz Ended!</h2>
                    <p>Your score: {state.score} out of {state.quizData.questions.length}</p>
                </div>
            ) : (
                <div>
                    <h3>{currentQuestion.text}</h3>
                    <div>
                        {currentQuestion.options.map((option, index) => (
                            <button key={index} onClick={() => answerQuestion(option)}>
                                {option}
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </div>
    )
}
export default QuizScreen