import { useDispatch, useSelector } from "react-redux"
import { selectResultState } from "../../store/slices/resultsScreen"
import { Routes } from "../../constants/routes"
import { useNavigate } from "react-router-dom"
import { resetConfig, selectSelectedConfig, setConfig } from "../../store/slices/quizConfiguration"
import { resetQuestions } from "../../store/slices/quizScreen"

export const ResultScreen = () => {
   const resultState = useSelector(selectResultState)
   const config = useSelector(selectSelectedConfig)
   console.log(resultState)
   const dispatch = useDispatch()
   
   const navigate = useNavigate();

   const handleRestart =() => {
    dispatch(resetQuestions())
    navigate(Routes.quizScreen)
   }

   const handleNewQuiz = () =>{
    resetConfig(config)
    navigate(Routes.main)
   }

    return(
        <div>
        <h1>Thank you for completing this quiz. Here are your results</h1>
        <div>
            <p>Correct answers: {resultState.rightAnswers} Total Questions: {resultState.totalQuestions} </p>
        </div>
        <div>
            <h2>Quiz Configuration</h2>
            <p>Quiz Type: {resultState.type} </p>
            <p>Quiz Category: {resultState.category}</p>
            {/*need to add the total time from config here*/}            
            <p>Difficulty: {resultState.difficulty}</p>
        </div>
        <div>
            {/*need to add total time taken*/}
        </div>
        <div>
            <button onClick ={handleRestart}>Restart</button>
            <button onClick = {handleNewQuiz}>Choose Another Quiz</button>
        </div>
    </div>
    )
}
/* import { Link } from "react-router-dom"

export const ResultScreen = () => {
   return(
    <div>
        <h1>Thank you for completing this quiz. Here are your results</h1>
        <div>
            <p>Correct answers: 3 Total Questions: 5</p>
        </div>
        <div>
            <h2>Quiz Configuration</h2>
            <p>Quiz Type: Practice </p>
            <p>Quiz Category: Programming</p>
            <p>Total Quiz Time: 5 minutes</p>
            <p>Difficulty: Medium</p>
        </div>
        <div>
            <p>Total time: 2 minutes</p>
        </div>
        <div>
            <Link to = '/quizscreen'>
                <button>Restart</button>
            </Link>
            <Link to = '/'>
                <button>Choose Another Quiz</button>
            </Link>
        </div>
    </div>
   )
}
export default ResultScreen */