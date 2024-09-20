import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Box, Button, Heading, List, ListItem, Text, VStack } from "@chakra-ui/react";
import { Routes } from '../constants/routes';
import '../App.css';
import { Wrapper } from '../components/wrapper';

interface Statistics {
  totalNumberOfQuestions: number;
  numberOfCorrectQuestions: number;
  totalCategoryQuestions: Record<string, number>;
  totalDifficultyQuestions: Record<string, number>;
  totalTypeQuestions: Record<string, number>;
}

export const StatisticsScreen: React.FC = () => {
  const statistics = useSelector((state: { statistics: Statistics }) => state.statistics);
  const navigate = useNavigate();

  const renderCategoryStats = () => {
    return Object.entries(statistics.totalCategoryQuestions).map(([category, count]) => (
      <ListItem key={category}>{category}: {count} questions</ListItem>
    ));
  };

  const renderDifficultyStats = () => {
    return Object.entries(statistics.totalDifficultyQuestions).map(([difficulty, count]) => (
      <ListItem key={difficulty}>{difficulty}: {count} questions</ListItem>
    ));
  };

  const renderTypeStats = () => {
    return Object.entries(statistics.totalTypeQuestions).map(([type, count]) => (
      <ListItem key={type}>{type}: {count} questions</ListItem>
    ));
  };

  const handleReturn = () => {
    navigate(Routes.main);
  };

  return (
    <Wrapper>
      <Box>
        <VStack spacing={4} align="stretch">
          <Heading as="h1" size="xl">Statistics</Heading>
        
          <Heading as="h2" size="lg">Overall Performance</Heading>
          <Text>Total Questions: {statistics.totalNumberOfQuestions}</Text>
          <Text>Correct Answers: {statistics.numberOfCorrectQuestions}</Text>
        
          <Heading as="h2" size="lg">Category Statistics</Heading>
          <List>{renderCategoryStats()}</List>
        
          <Heading as="h2" size="lg">Difficulty Statistics</Heading>
          <List>{renderDifficultyStats()}</List>
        
          <Heading as="h2" size="lg">Question Type Statistics</Heading>
          <List>{renderTypeStats()}</List>
        
          <Button onClick={handleReturn}>Return to Quiz Settings</Button>
        </VStack>
      </Box>
    </Wrapper>
  );
};

export default StatisticsScreen;