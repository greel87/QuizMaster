import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchCategories, selectConfig } from "../../store/slices/quizConfiguration"
import { Form } from "./form"
import { Wrapper } from "../../components/wrapper"

export const Settings = () => {
  const dispatch = useDispatch()
  const config = useSelector(selectConfig)

  useEffect(() => {
    const fetchData = () => dispatch(fetchCategories());
    fetchData();
  }, [dispatch])

  return (
    <Wrapper>
      <Form config={config} />
    </Wrapper>
  )
}

export default Settings