import { createBrowserRouter, RouterProvider } from "react-router-dom"
import FirstScreen from "../Screens/FirstScreen"
import QuizScreen from "../Screens/QuizScreen"
import { ResultScreen } from "../Screens/ResultsScreen"
import StatisticsScreen from "../Screens/StatisticsScreen"

const router = createBrowserRouter([
    {
        path: '/',
        element:   <FirstScreen />,
    },
    {
        path:'/quizscreen',
        element: <QuizScreen />
    },
    {
        path: '/resultscreen',
        element: <ResultScreen />
    },
    {
        path: '/statisticsscreen',
        element: <StatisticsScreen />
    }
])
export const RootNavigation = () => {
    return <RouterProvider router = {router} />
}