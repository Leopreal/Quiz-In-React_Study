

import {  act, createContext, useReducer } from "react";
import questions from '../data/questions_complete'

const STAGES = ["Start", "Category", "Playing","End" ]

const inicialState = {
    gameStage: STAGES[0],
    questions,
    currentQuestion: 0,
    score: 0,
    answerSelected: false,
    help: false,
    opcaoEsconder: null
}

const quizReducer = (state, action) => {
    

    switch(action.type) {
        case "MUDAR_ESTAGIO": 
            return {
                ...state, // manter as perguntas
                gameStage: STAGES[1]
            };

            case "COMEÇAR_JOGO":
                let quizQuestion = null

                state.questions.forEach((question) => {
                    if(question.category === action.payload) {
                        quizQuestion = question.questions
                    }
                })

                return {
                    ...state,
                    questions: quizQuestion,
                    gameStage: STAGES[2],
                }

            case "EMBARALHAR_PERGUNTAS":
                const reordenarQuestions = state.questions.sort(() => {
                    return Math.random() -0.5;
                });
                return {
                    ...state,
                    questions: reordenarQuestions,
                };

                case "MUDANÇA_PERGUNTA": 
                const nextQuestion = state.currentQuestion + 1
                let endGame = false

                if(!state.questions[nextQuestion]) {
                    endGame = true
                }

                


                return {
                    ...state,
                    currentQuestion: nextQuestion,
                    gameStage: endGame ? STAGES[3] : state.gameStage,
                    answerSelected: false,
                    help: false
                }

                case "NOVO_JOGO": 
                return inicialState;

                case "RESPOSTA_CHECADA":
                if(state.answerSelected) return state; // faz com q o usuario nao possa clicar mais de uma vez na resposta


                    const answer = action.payload.answer
                    const option = action.payload.option
                    let correctAnswer = 0

                    if(answer === option) correctAnswer = 1

                    return {
                        ...state,
                        score: state.score + correctAnswer, // conta mais uma pontuação
                        answerSelected: option, // exibição do botao
                    }

                    case "MOSTRAR_DICA":
                        return{
                            ...state,
                            help: "tip",
                        }

                    case "REMOVER_OPCAO": 
                    const perguntaParaRemover = state.questions[state.currentQuestion]

                    let repetir = true
                    let opcaoEsconder

                    perguntaParaRemover.options.forEach((option) => {
                        if(option !== perguntaParaRemover.answer && repetir) {
                            opcaoEsconder = option
                            repetir = false
                        }
                    });
                    return {
                        ...state,
                        opcaoEsconder,
                        help: true,
                    }

                    

            default:
            return state;
    }

}

export const QuizContext = createContext()

export const QuizProvider = ({children}) => {
    const value = useReducer(quizReducer, inicialState);


    return <QuizContext.Provider value={value}>{children}</QuizContext.Provider>
}