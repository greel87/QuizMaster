import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Heading, VStack } from "@chakra-ui/react";
import { fetchCategories, selectConfig } from "../../store/slices/quizConfiguration";
import { Form } from "./form";
import { Wrapper } from "../../components/wrapper"
import '../../App.css';
import { AppDispatch } from "../../store"; 

export const QuizConfiguration: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const config = useSelector(selectConfig);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  return (
    <Wrapper>
      <VStack align="center" width="100%" maxWidth="500px">
        <Heading as="h1">Quiz Settings</Heading>
        <Form config={config} />
      </VStack>
    </Wrapper>
  );
};

export default QuizConfiguration;