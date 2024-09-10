import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { answer, selectAmountOfQuestions, selectCurrentQuestion, selectQuestions } from "../../store/slices/quizScreen";
import { useNavigate } from "react-router-dom";
import { Routes } from "../../constants/routes";
import { decode } from "html-entities";
import { setResults } from "../../store/slices/resultsScreen";



export const Questions = ({config}) => {
  const questions = useSelector(selectQuestions);
  const currentQuestion = useSelector(selectCurrentQuestion);
  const question = questions[currentQuestion];
  const numberOfQuestions = useSelector(selectAmountOfQuestions)
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [rightAnswers, setRightAnswers] = useState(0)
  

  useEffect(() => {
    if (questions.length && currentQuestion && currentQuestion === questions.length) {
    
      const resultState = {
        type: questions[0].type ,
        category: questions[0].category,
        difficulty: config.difficulty,
        totalQuestions: numberOfQuestions,
        rightAnswers: rightAnswers

      }
      console.log(resultState)
      dispatch(setResults(resultState))
      navigate(Routes.resultScreen);
    
    }
  }, [currentQuestion, questions, navigate]);

  if (!question) {
    return <p>Something went wrong</p>;
  }
  
  const answers = [...question.incorrect_answers, question.correct_answer];``
 

  const handleAnswer = (userAnswer) => {
    if (userAnswer === question.correct_answer) {
      setRightAnswers((prev) => prev + 1);
    }
    dispatch(answer(userAnswer === question.correct_answer));
  };

  return (
    <div>
      <div>
        <div>
         <h1>Question {currentQuestion} of {numberOfQuestions}</h1>
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