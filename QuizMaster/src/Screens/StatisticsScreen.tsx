import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Routes } from '../constants/routes';

export const StatisticsScreen = () => {
  const statistics = useSelector(state => state.statistics);
  const navigate = useNavigate()

  const renderCategoryStats = () => {
    return Object.entries(statistics.totalCategoryQuestions).map(([category, count]) => (
      <li key={category}>{category}: {count} questions</li>
    ));
  };

  const renderDifficultyStats = () => {
    return Object.entries(statistics.totalDifficultyQuestions).map(([difficulty, count]) => (
      <li key={difficulty}>{difficulty}: {count} questions</li>
    ));
  };

  const renderTypeStats = () => {
    return Object.entries(statistics.totalTypeQuestions).map(([type, count]) => (
      <li key={type}>{type}: {count} questions</li>
    ));
  };

  const handleReturn= () => {
    navigate(Routes.main)
  }

  return (
    <div>
      <h1>Statistics</h1>
      
      <h2>Overall Performance</h2>
      <p>Total Questions: {statistics.totalNumberOfQuestions}</p>
      <p>Correct Answers: {statistics.numberOfCorrectQuestions}</p>
      
      <h2>Category Statistics</h2>
      <ul>
        {renderCategoryStats()}
      </ul>
      
      <h2>Difficulty Statistics</h2>
      <ul>
        {renderDifficultyStats()}
      </ul>
      
      <h2>Question Type Statistics</h2>
      <ul>
        {renderTypeStats()}
      </ul>
      <button onClick = {handleReturn}>Start a New Quiz</button>
    </div>
  );
};

export default StatisticsScreen;