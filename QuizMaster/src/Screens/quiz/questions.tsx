import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { answer, selectAmountOfQuestions, selectCurrentQuestion, selectQuestions, selectTimeQuestions } from "../../store/slices/quizScreen";
import { useNavigate } from "react-router-dom";
import { Routes } from "../../constants/routes";
import { decode } from "html-entities";
import { setResults } from "../../store/slices/resultsScreen";



export const Questions = ({config}) => {
  const questions = useSelector(selectQuestions);
  const currentQuestion = useSelector(selectCurrentQuestion);
  const question = questions[currentQuestion];
  const numberOfQuestions = useSelector(selectAmountOfQuestions)
  const time = useSelector(selectTimeQuestions)
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [rightAnswers, setRightAnswers] = useState(0)
  const [timer, setTimer] = useState(time);
  const [timeUsed, setTimeUsed] = useState(0);

  const handleTimeUp = useCallback(() => {
    dispatch(answer(false));
    setTimer(time);
  }, [dispatch, time]);

  useEffect(() => {
    if (questions.length && currentQuestion && currentQuestion === questions.length) {
      const resultState = {
        type: questions[0].type,
        category: questions[0].category,
        difficulty: config.difficulty,
        totalQuestions: numberOfQuestions,
        rightAnswers: rightAnswers,
        timeTaken: timeUsed, // Calculate time taken
        totalTime: time // Add total time to results
      }
      dispatch(setResults(resultState))
      navigate(Routes.resultScreen);
    }
  }, [currentQuestion, questions, navigate]);

  useEffect(() => {
    const countdown = setInterval(() => {
      setTimer((prevTimer) => {
        if (prevTimer <= 0) {
          clearInterval(countdown);
          handleTimeUp();
          return 0;
        }
        return prevTimer - 1000;
      });
    }, 1000);
  
    // Separate effect for updating timeUsed
    const timeUsed = setInterval(() => {
      setTimeUsed((prevTimeUsed) => prevTimeUsed + 1000);
    }, 1000);
  
    return () => {
      clearInterval(countdown);
      clearInterval(timeUsed);
    };
  }, [currentQuestion, time, handleTimeUp]);
  if (!question) {
    return <p>Something went wrong</p>;
  }
  
  const answers = [...question.incorrect_answers, question.correct_answer];

  const handleAnswer = (userAnswer) => {
    if (userAnswer === question.correct_answer) {
      setRightAnswers((prev) => prev + 1);
    }
    dispatch(answer(userAnswer === question.correct_answer));
  };

  // Function to format time in minutes and seconds
  const formatTime = (milliseconds) => {
    const minutes = Math.floor(milliseconds / 60000);
    const seconds = Math.floor((milliseconds % 60000) / 1000);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  return (
    <div>
      <div>
        <div>
         <h1>Question {currentQuestion} of {numberOfQuestions}</h1>
         <h2>Time Remaining: {formatTime(timer)}</h2>
        </div>
        <div>
          <h2>Question: {decode(question.question)}</h2>
          <h3>Difficulty: {question.difficulty}</h3>
          <h3>Category: {question.category}</h3>
        </div>
        <div>
          {answers.map((answer) => (
            <div key={answer}>
              <p>{answer}</p>
              <button onClick={() => handleAnswer(answer)}>
                Select
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};