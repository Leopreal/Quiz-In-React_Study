import { useContext } from 'react'
import { QuizContext } from "../context/quiz";
import Options from './Options';


import './Questions.css'


const Questions = () => {
    const [quizState, dispatch] = useContext(QuizContext);
    const currentQuestion = quizState.questions[quizState.currentQuestion]

    const onSelectOption = (option) => {
      dispatch({
        type: "RESPOSTA_CHECADA",
        payload: {answer: currentQuestion.answer, option}

      })
    };

    console.log(quizState)

  return (
    <div id='questions'>
        <p>Pergunta {quizState.currentQuestion + 1} de {quizState.questions.length}</p>
        <h2>{currentQuestion.question}</h2>
        <div id="options-container">
            {currentQuestion.options.map((option) => (
              <Options 
              option= {option} 
              key={option} 
              answer={currentQuestion.answer}
              selectOption={() => onSelectOption(option)}
              hide={quizState.opcaoEsconder === option ? "hide" : null}
              />
            ))}
        </div>
        {!quizState.answerSelected && !quizState.help &&(
          <>
          {currentQuestion.tip && (
            <button onClick={() => dispatch({type: "MOSTRAR_DICA"})}>Dica</button>
          )}
          <button onClick={() => dispatch({type: "REMOVER_OPCAO"})}>Excluir uma</button>
          </>
        )}

        { !quizState.answerSelected && quizState.help === 'tip' &&
        ( <p>{currentQuestion.tip}</p>)}

        {quizState.answerSelected && (
          <button onClick={() => dispatch({ type: "MUDANÇA_PERGUNTA"})}>
          Continuar
          </button>
        )}
    </div>
  )
}

export default Questions