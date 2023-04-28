import { memo, useEffect, useState } from "react";
import '../App.css'
const PrikazMemo = memo(Prikaz)

function Prikaz({ props, showAnswers, handleNextQuestion, handleAnswer, questionIndex }) {
    // function Prikaz({ handleAnswer, showAnswers, handleNextQuestion, data: { question, correctAnswer, answers } }) {

    const { question, correct_answer, answers, category } = props;
    //number of questions
    const totalNumber = 5

    return (
        <div>
            <div className="question-div">
                <span>{questionIndex} / {totalNumber}</span>
                <h1>{question}</h1>
                <small>Category: {category}</small>
            </div>
            <div className="answer-div">
                {answers.map((answer) => {
                    const specialClassName = showAnswers ? (
                        (answer === correct_answer) ? "green-button" : "red-button"
                    ) : "";
                    return (
                        <button
                            key={answer}
                            className={`answer-button ${specialClassName}`}
                            onClick={() => handleAnswer(answer)}
                        >{answer}</button>
                    )
                })}
            </div>
            {
                showAnswers && (<button onClick={handleNextQuestion} className="next-button">Next Question</button>)
            }
        </div>
    )

}
export default PrikazMemo