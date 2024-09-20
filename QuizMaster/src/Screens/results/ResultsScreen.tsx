import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Box, VStack, Heading, Text, Button, Container, Divider, Stat, StatLabel, StatNumber, StatGroup } from "@chakra-ui/react";
import { resetResults, selectResultState } from "../../store/slices/resultsScreen";
import { Routes } from "../../constants/routes";
import { resetConfig, selectSelectedConfig, setConfig } from "../../store/slices/quizConfiguration";
import { resetQuestions, setTime } from "../../store/slices/quizScreen";
import { updateStatistics } from "../../store/slices/statistics";
import { Wrapper } from "../../components/wrapper";

export const ResultScreen: React.FC = () => {
  const resultState = useSelector(selectResultState);
  const config = useSelector(selectSelectedConfig);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (resultState.totalQuestions !== null && resultState.rightAnswers !== null) {
      dispatch(updateStatistics({
        totalQuestions: resultState.totalQuestions,
        rightAnswers: resultState.rightAnswers,
        category: resultState.category ?? 'Unknown',
        difficulty: resultState.difficulty ?? 'Unknown',
        type: resultState.type ?? 'Unknown'
      }));
    }
  }, [dispatch, resultState]);

  const handleRestart = () => {
    dispatch(resetQuestions());
    dispatch(resetResults());
    dispatch(setConfig(config));
    dispatch(setTime(config.time ? parseInt(config.time) : 0));
    navigate(Routes.quizScreen);
  };

  const handleNewQuiz = () => {
    dispatch(resetConfig());
    dispatch(resetResults());
    dispatch(resetQuestions());
    navigate(Routes.main);
  };

  const formatTime = (milliseconds: number | null) => {
    if(milliseconds == null) return '0:00'
    const minutes = Math.floor(milliseconds / 60000);
    const seconds = Math.floor((milliseconds % 60000) / 1000);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  return (
    <Wrapper>
      <Container maxW="container.md" py={10}>
        <VStack spacing={6} align="stretch">
          <Heading as="h1" size="xl" textAlign="center">
            Thank you for completing this quiz. Here are your results:
          </Heading>

          <Box bg="gray.100" p={6} borderRadius="md">
            <StatGroup>
              <Stat>
                <StatLabel>Correct Answers</StatLabel>
                <StatNumber>{resultState.rightAnswers} / {resultState.totalQuestions}</StatNumber>
              </Stat>
              <Stat>
                <StatLabel>Time Taken</StatLabel>
                <StatNumber>{formatTime(resultState.timeTaken)}</StatNumber>
              </Stat>
            </StatGroup>
          </Box>

          <Box>
            <Heading as="h2" size="md" mb={3}>
              Quiz Configuration
            </Heading>
            <VStack align="stretch" spacing={2}>
              <Text>Quiz Type: {resultState.type}</Text>
              <Text>Quiz Category: {resultState.category}</Text>
              <Text>Total Quiz Time: {formatTime(resultState.totalTime)}</Text>
              <Text>Difficulty: {resultState.difficulty}</Text>
            </VStack>
          </Box>

          <Divider />

          <Box>
            <Button colorScheme="blue" mr={3} onClick={handleRestart}>
              Restart
            </Button>
            <Button variant="outline" onClick={handleNewQuiz}>
              Choose Another Quiz
            </Button>
          </Box>
        </VStack>
      </Container>
    </Wrapper>
  );
};