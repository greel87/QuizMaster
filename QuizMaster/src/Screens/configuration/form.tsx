import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Box, Button, FormControl, FormLabel, Select, VStack } from "@chakra-ui/react";
import { setConfig } from "../../store/slices/quizConfiguration";
import { setTime } from "../../store/slices/quizScreen";
import { Routes } from "../../constants/routes";
import '../../App.css';
import { ConfigItem } from "../../constants";

interface FormProps {
  config: {
    numberOfQuestions: ConfigItem[];
    time: ConfigItem[];
    difficulty: ConfigItem[];
    type: ConfigItem[];
    categories: ConfigItem[];
  };
}

const getInitialState = (configEntries: [string, Array<ConfigItem>][]) => {
  const result: Record<string, string> = {};
  configEntries.forEach(([key, value]) => {
    result[key] = value[0]?.value ?? value[0]?.id?.toString() ?? '';
  });
  return result;
};

export const Form: React.FC<FormProps> = ({ config }) => {
  const values = Object.entries(config);
  const [formState, setFormState] = useState(getInitialState(values));
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleInputChange = (key: string, value: string) => {
    setFormState((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleStartQuiz = () => {
    dispatch(setConfig(formState));
    dispatch(setTime(parseInt(formState.time)));
    navigate(Routes.quizScreen);
  };

  const handleStatistics = () => {
    navigate(Routes.statisticsScreen);
  };

  return (
    <Box width="100%">
    <VStack spacing={4} align="stretch">
      {values.map(([key, value]) => (
        <FormControl key={key}>
          <FormLabel htmlFor={key}>{key.toUpperCase()}</FormLabel>
          <Select
            id={key}
            value={formState[key]}
            onChange={(event) => handleInputChange(key, event.target.value)}
          >
            {value.map((item) => (
              <option key={item.id} value={item.value ?? item.id}>
                {item.name}
              </option>
            ))}
          </Select>
        </FormControl>
      ))}
      <Button colorScheme="blue" onClick={handleStartQuiz} width="100%">
        Start Quiz
      </Button>
      <Button onClick={handleStatistics} width="100%">
       View Statistics
      </Button>
    </VStack>
  </Box>
  );
};

export default Form;