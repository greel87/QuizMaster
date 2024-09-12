import { useDispatch, useSelector } from "react-redux"
import { resetResults, selectResultState } from "../../store/slices/resultsScreen"
import { Routes } from "../../constants/routes"
import { useNavigate } from "react-router-dom"
import { resetConfig, selectSelectedConfig, setConfig } from "../../store/slices/quizConfiguration"
import { resetQuestions, setTime } from "../../store/slices/quizScreen"
import { useEffect } from "react"
import { updateStatistics } from "../../store/slices/statistics"

export const ResultScreen = () => {
    const resultState = useSelector(selectResultState);
    const config = useSelector(selectSelectedConfig);
    const dispatch = useDispatch();
    const navigate = useNavigate();
  
    // Update statistics when component mounts
    useEffect(() => {
      dispatch(updateStatistics(resultState));
    }, []);

   const handleRestart = () => {
    dispatch(resetQuestions())
    dispatch(resetResults())
    dispatch(setConfig(config))
    dispatch(setTime(config.time))
   
    navigate(Routes.quizScreen)
   }

   const handleNewQuiz = () => {
    dispatch(resetConfig())
    dispatch(resetResults())
    dispatch(resetQuestions())
    navigate(Routes.main)
   }

   // Function to format time in minutes and seconds
   const formatTime = (milliseconds) => {
     const minutes = Math.floor(milliseconds / 60000);
     const seconds = Math.floor((milliseconds % 60000) / 1000);
     return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
   };

   return(
    <div>
        <h1>Thank you for completing this quiz. Here are your results</h1>
        <div>
            <p>You answered {resultState.rightAnswers} out of {resultState.totalQuestions} questions correctly.</p>
        </div>
        <div>
            <h2>Quiz Configuration</h2>
            <p>Quiz Type: {resultState.type}</p>
            <p>Quiz Category: {resultState.category}</p>
            <p>Total Quiz Time: {formatTime(resultState.totalTime)}</p>
            <p>Difficulty: {resultState.difficulty}</p>
        </div>
        <div>
            <p>Time taken: {formatTime(resultState.timeTaken)}</p>
        </div>
        <div>
            <button onClick={handleRestart}>Restart</button>
            <button onClick={handleNewQuiz}>Choose Another Quiz</button>
        </div>
    </div>
   )
}