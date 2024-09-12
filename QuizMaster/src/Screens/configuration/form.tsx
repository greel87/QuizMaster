import { useState } from "react";
import { setConfig } from "../../store/slices/quizConfiguration";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Routes } from "../../constants/routes"
import { setTime } from "../../store/slices/quizScreen";

const getInitialState = (configEntries) => {
    const result = {};
  
    configEntries.forEach(([key, value]) => {
      result[key] = value[0]?.value ?? value[0]?.id;
    })
    return result;
  }

  export const Form = ({ config }) => {
    const values = Object.entries(config)
    const [formState , setFormState] = useState(getInitialState(values))
    const dispatch = useDispatch()
    const navigate = useNavigate()
  
    const handleInputChange = (key, value) => {
      setFormState((prev) => ({
        ...prev,
        [key]: value
      }))
    }
  
    const handleStartQuiz = () => {
      dispatch(setConfig(formState))
      dispatch(setTime(formState.time))
      navigate(Routes.quizScreen)
    };
    const handleStatistics = () => {
        navigate(Routes.statisticsScreen)
    }
  
    return (
      <div className="form-container">
        <h2>Form</h2>
        {values.map(([key, value]) => (
          <div key={key} className="form-group">
            <label htmlFor={key}>{key.toUpperCase()}</label>
            <select
              id={key}
              value={formState[key]}
              onChange={(event) => handleInputChange(key, event.target.value)}
            >
              {value.map(item => (
                <option key={item.id} value={item.value ?? item.id}>
                  {item.name}
                </option>
              ))}
            </select>
          </div>
        ))}
        <button onClick={handleStartQuiz} className="start-button">
          Start quiz
        </button>
        <button onClick={handleStatistics}>See My Statistics</button>
      </div>
    )
  }
  export default Form