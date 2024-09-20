import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import QuizConfiguration from "../Screens/configuration/QuizConfiguration";
import QuizScreen from "../Screens/quiz/QuizScreen";
import { ResultScreen } from "../Screens/results/ResultsScreen";
import StatisticsScreen from "../Screens/StatisticsScreen";
import { Provider } from "react-redux";
import { persistor, store } from "../store";
import { Routes } from "../constants/routes";
import { PersistGate } from "redux-persist/integration/react";

const router = createBrowserRouter([
  {
    path: Routes.main,
    element: <QuizConfiguration />,
  },
  {
    path: Routes.quizScreen,
    element: <QuizScreen />,
  },
  {
    path: Routes.resultScreen,
    element: <ResultScreen />,
  },
  {
    path: Routes.statisticsScreen,
    element: <StatisticsScreen />,
  },
]);

export const RootNavigation = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ChakraProvider>
          <RouterProvider router={router} />
        </ChakraProvider>
      </PersistGate>
    </Provider>
  );
};