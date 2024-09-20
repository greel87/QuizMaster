import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Wrapper } from "../../components/wrapper";
import { selectSelectedConfig } from "../../store/slices/quizConfiguration";
import { fetchQuestions } from "../../store/slices/quizScreen";
import { Questions } from "./questions";
import { Box } from "@chakra-ui/react";
import '../../App.css';
import { AppDispatch } from "../../store";

export const QuizScreen: React.FC = () => {
  const config = useSelector(selectSelectedConfig);
  const dispatch = useDispatch<AppDispatch>()

  useEffect(() => {
    if (config.numberOfQuestions !== null) {
      dispatch(fetchQuestions({
        numberOfQuestions: parseInt(config.numberOfQuestions, 10),
        type: config.type || '',
        difficulty: config.difficulty || '',
        categories: parseInt(config.categories || '-1', 10)
      }));
    }
  }, [dispatch, config]);

  return (
    <Wrapper>
      <Box>
        <Questions config={config} />
      </Box>
    </Wrapper>
  );
};

export default QuizScreen;