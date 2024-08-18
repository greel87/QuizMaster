import '../App.css'


const FirstScreen = () =>{

    return(
        <div>
            <h1>Quiz Master</h1>
            <div>
                <label>Number of Questions</label>
                <br />
                <input type= "number"
                       min = "5"
                       max = "15" />
            </div>
            <br />
            <div>
                <label> Select Category</label>
                <br/>
                <select>
                    <option value="">Select a category</option>
                    <option value="science">Science</option>
                    <option value="history">History</option>
                    <option value="geography">Geography</option>
                    <option value="arts">Arts & Literature</option>
                </select>
            </div>
            <br />
            <div>
                <label>Select Difficulty</label>
                <br />
                <select>
                    <option value="">Select a Difficulty</option>
                    <option value="easy">Easy</option>
                    <option value="medium">Medium</option>
                    <option value="hard">Hard</option>
                </select>
            </div>
            <br />
            <div>
                <label>Select Type</label>
                <br />
                <select>
                    <option value="">Select a Type</option>
                    <option value="science">Practice</option>
                    <option value="graded">Graded</option>
                </select>
            </div>
            <br />
            <div>
                <label>Select Time</label>
                <br />
                <select>
                    <option value="">Select a Time</option>
                    <option value="60000">One Minute</option>
                    <option value="120000">Two Minutes</option>
                    <option value="300000">Five Minutes</option>
                </select>
            </div>
            <br />
            <div>
                <button>Start Quiz</button>
                <button> See My Statistics</button>
            </div>
        </div>
    )
}

export default FirstScreen