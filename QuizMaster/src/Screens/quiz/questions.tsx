import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Box, Button, Heading, Text, VStack } from "@chakra-ui/react";
import { decode } from "html-entities";
import { answer, selectAmountOfQuestions, selectCurrentQuestion, selectQuestions, selectTimeQuestions } from "../../store/slices/quizScreen";
import { Routes } from "../../constants/routes";
import { setResults } from "../../store/slices/resultsScreen";
import '../../App.css';

interface QuestionsProps {
  config: {
    numberOfQuestions: string | null;
    time: string | null;
    difficulty: string | null;
    type: string | null;
    categories: string | null;
  };
}

interface QuestionType {
  incorrect_answers: string[];
  correct_answer: string;
  question: string;
  difficulty: string;
  category: string;
  type: string;
}

export const Questions: React.FC<QuestionsProps> = ({ config }) => {
  const questions = useSelector(selectQuestions) as QuestionType[];
  const currentQuestion = useSelector(selectCurrentQuestion);
  const question = questions[currentQuestion];
  const numberOfQuestions = useSelector(selectAmountOfQuestions);
  const time = useSelector(selectTimeQuestions);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [rightAnswers, setRightAnswers] = useState(0);
  const [timer, setTimer] = useState(time);
  const [timeUsed, setTimeUsed] = useState(0);

  const handleTimeUp = useCallback(() => {
    dispatch(answer(false));
    setTimer(time);
  }, [dispatch, time]);

  useEffect(() => {
    if (questions.length && currentQuestion && currentQuestion === questions.length) {
      const resultState = {
        type: questions[0]?.type,
        category: questions[0]?.category,
        difficulty: config.difficulty,
        totalQuestions: numberOfQuestions,
        rightAnswers: rightAnswers,
        timeTaken: timeUsed,
        totalTime: time
      };
      dispatch(setResults(resultState));
      navigate(Routes.resultScreen);
    }
  }, [currentQuestion, questions, navigate, config.difficulty, numberOfQuestions, rightAnswers, timeUsed, time, dispatch]);

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
  
    const timeUsedInterval = setInterval(() => {
      setTimeUsed((prevTimeUsed) => prevTimeUsed + 1000);
    }, 1000);
  
    return () => {
      clearInterval(countdown);
      clearInterval(timeUsedInterval);
    };
  }, [currentQuestion, time, handleTimeUp]);

  if (!question) {
    return <Text>Something went wrong</Text>;
  }
  
  const answers = [...question.incorrect_answers, question.correct_answer];

  const handleAnswer = (userAnswer: string) => {
    if (userAnswer === question.correct_answer) {
      setRightAnswers((prev) => prev + 1);
    }
    dispatch(answer(userAnswer === question.correct_answer));
  };

  const formatTime = (milliseconds: number) => {
    const minutes = Math.floor(milliseconds / 60000);
    const seconds = Math.floor((milliseconds % 60000) / 1000);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  return (
    <Box>
      <VStack spacing={4} align="stretch">
        <Heading as="h1" size="lg">Question {currentQuestion + 1} of {numberOfQuestions}</Heading>
        <Text>Time Remaining: {formatTime(timer)}</Text>
        <Heading as="h2" size="md">Question: {decode(question.question)}</Heading>
        <Text>Difficulty: {question.difficulty}</Text>
        <Text>Category: {question.category}</Text>
        {answers.map((answer) => (
          <Button key={answer} onClick={() => handleAnswer(answer)}>
            {decode(answer)}
          </Button>
        ))}
      </VStack>
    </Box>
  );
};