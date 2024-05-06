import { useContext } from 'react'
import { QuizContext } from '../context/quiz'

import WellDone from '../img/welldone.svg'

import './GameOver.css'



import React from 'react'
const GameOver = () => {
    const [quizState, dispatch] = useContext(QuizContext);
  return (
    <div id='gameover'>

        <h2>Game Over</h2>
        <p>Pontuação: {quizState.score}</p>
        <p>Você acertor {quizState.score} de {quizState.questions.length} perguntas</p>
        <img src={WellDone} alt="Fim do QUiz" />
        <button onClick={() => dispatch({type: "NOVO_JOGO"})}>Reiniciar</button>
    </div>
  )
}

export default GameOver