import { useEffect, useState } from 'react'
import axios from 'axios'
import PrikazMemo from './components/Prikaz'

import './App.css'

function App() {
  const [question, setQuestion] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showAnswers, setShowAnswers] = useState(false);



  useEffect(() => {
    const url = 'https://opentdb.com/api.php?amount=5&difficulty=easy&type=multiple'

    axios.get(url)
      .then(res => res.data)
      .then(data => {
        const questions = data.results.map((question) => ({
          ...question,
          answers: [question.correct_answer, ...question.incorrect_answers].sort(() => Math.random() - 0.5),
          category: [...question.category]
        }))
        setQuestion(questions)
      })
      .catch(err => alert(err))
  }, [])


  function handleAnswer(answer) {
    if (!showAnswers) {
      if (answer === question[currentIndex].correct_answer) {
        setScore(score + 1);
      }
    }
    setShowAnswers(true)
  }


  function handleNextQuestion() {
    setCurrentIndex(currentIndex + 1)
    setShowAnswers(false)
  }

  return (
    <div className="App">
      {currentIndex >= question.length ? ((score > 2) ?
        (<h1>Game Ended!<br />Your Score is {score}! 😀</h1>) :
        (<h1>Game Ended!<br />Your Score is {score}! 😐 <br /> <br /> Better luck next time! 😀</h1>)
      ) :
        (<PrikazMemo
          key={question[currentIndex]}
          handleAnswer={handleAnswer}
          showAnswers={showAnswers}
          handleNextQuestion={handleNextQuestion}
          props={question[currentIndex]}
          questionIndex={currentIndex + 1}
        />)
      }
      < h2 > Test</h2>
    </div >
  )
}

export default App
