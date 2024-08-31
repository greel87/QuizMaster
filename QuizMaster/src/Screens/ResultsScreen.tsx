import { Link } from "react-router-dom"

export const ResultScreen = () => {
   return(
    <div>
        <h1>Thank you for completing this quiz. Here are your results</h1>
        <div>
            <p>Correct answers: 3 Total Questions: 5</p>
        </div>
        <div>
            <h2>Quiz Configuration</h2>
            <p>Quiz Type: Practice </p>
            <p>Quiz Category: Programming</p>
            <p>Total Quiz Time: 5 minutes</p>
            <p>Difficulty: Medium</p>
        </div>
        <div>
            <p>Total time: 2 minutes</p>
        </div>
        <div>
            <Link to = '/quizscreen'>
                <button>Restart</button>
            </Link>
            <Link to = '/'>
                <button>Choose Another Quiz</button>
            </Link>
        </div>
    </div>
   )
}
export default ResultScreen