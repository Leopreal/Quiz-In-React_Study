import { useContext } from "react"
import { QuizContext } from "../context/quiz"

import Category from '../img/category.svg'

import "./PickCategory.css"

const PickCategory = () => {
    const [quizState, dispatch] = useContext(QuizContext);

    const escolhaCategoria = (category) => {
        dispatch({type: "COMEÇAR_JOGO", payload: category})


        dispatch({type: "EMBARALHAR_PERGUNTAS"})
    }


  return (
    <div id="category">
        <h2>Escolha uma categoria</h2>
        <p>As perguntas do quiz serão referente as linguagens abaixo: </p>
        <div>
        {quizState.questions.map((question) => (
            <button 
            onClick={() => escolhaCategoria(question.category)} key={question.category}>{question.category}</button>
        ))}
        </div>

        <img src={Category} alt="categoria do quiz" />

    </div>
  )
}

export default PickCategory