import { useDispatch, useSelector } from "react-redux"
import { Wrapper } from "../../components/wrapper"
import { selectSelectedConfig } from "../../store/slices/quizConfiguration"
import { useEffect } from "react"
import { fetchQuestions } from "../../store/slices/quizScreen"
import { Questions } from "./questions"

export const QuizScreen = () => {
  const config = useSelector(selectSelectedConfig)
  const dispatch = useDispatch()
  

  useEffect(() => {
    dispatch(fetchQuestions(config))
  }, [dispatch])

  return (
      <Wrapper>
        <Questions config={config} />
      </Wrapper>
  )
}
export default QuizScreen

/* import { useReducer} from 'react';
import '../../App.css'
import { mockQuizData } from '../MockData';
import { Link, useNavigate } from 'react-router-dom';


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
                    timerId: null,
                }
            }
        case 'endQuiz':
            clearInterval(state.timerId);
            return {
                ...state,
                isQuizEnded: true,
                timerId: null,
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
    const navigate = useNavigate()

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

    const answerQuestion = (answer: string) => {
        dispatch({ type: 'answerQuestion', payload: answer });
        nextQuestion();
    }

    const formatTime = (seconds:number) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
    }


    if (!state.timerId && !state.isQuizEnded) {
        startTimer();
    }

    const currentQuestion = state.quizData.questions[state.currentQuestion];
    const progress = (state.currentQuestion / state.quizData.questions.length) * 100;

    if (state.isQuizEnded) {
        navigate('/resultscreen');
        return null; 
    }

    return (
      
        <div id='QuizScreen'>
            <h1>React Quiz</h1>
            <div>Time Left: {formatTime(state.timeLeft)}</div>
            <div>
                <div>
                    <div style={{width: `${progress}%`,backgroundColor: '#4caf50',}}
                    ></div>
                </div>
                <div>Question {state.currentQuestion + 1} of {state.quizData.questions.length}</div>
            </div>
            <div>
                <h3>{currentQuestion.text}</h3>
                <div>
                    {currentQuestion.options.map((option: string, index: number) => (
                        <button key={index} onClick={() => answerQuestion(option)}>
                            {option}
                        </button>
                    ))}
                </div>
            </div>
            <div>
                <Link to='/resultscreen'>
                <button onClick={(event) =>{
                    if(!confirm("Are you sure you want to end this quiz?")){
                        event.preventDefault()
                    }
                    else {
                        navigate('/resultscreen')
                    }
                    }}>End Quiz</button>
                </Link>
            </div>
        </div>     
    )
}
export default QuizScreen */