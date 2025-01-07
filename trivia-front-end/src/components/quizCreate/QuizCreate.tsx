import { SyntheticEvent, useState } from "react";
import "./QuizCreate.css"

function QuizCreate() {

  const [quizName, setQuizName] = useState("");
  const [questions, setQuestions] = useState(
    [{
      content: "", correct: "", incorrectAnswers: ["", "", ""]
    }])

  const questionChange = (index: number, field: string, value: string) => {
    const updatedQuestions = [...questions]
    if (field === "incorrectAnswers") {
      updatedQuestions[index].incorrectAnswers = value.split(",")
    } 
    else {
      //updatedQuestions[index][field] = value;
    }
  }

  const addQuestion = () => {
    setQuestions([
      ...questions, {content: "", correct: "", incorrectAnswers: ["", "", ""]}
    ])
  }

  let createQuiz = () => {

    console.log("Quiz Created!")
  }
  const [timer, setTimer] = useState(0);

  return (
    <div>
      <h1>Create a Quiz </h1>

      <label>
        {/*Whenever thte text inside the username or password fields change, it will update the state variable*/}
        Quiz Name:{" "}
        <input
          type="text"
          id="quizNameField"
          value={quizName}
          onChange={(e: SyntheticEvent) => {
            setQuizName((e.target as HTMLInputElement).value);
          }}
        />
      </label>
      <br></br>
      <br></br>
      <label>
        {/*Whenever thte text inside the username or password fields change, it will update the state variable*/}
        Time Limit:{" "}
        <input
          type="number"
          id="timerField"
          value={timer}
          onChange={(e: SyntheticEvent) => {
            setTimer((e.target as HTMLInputElement).value as unknown as number);
          }}
        />
      </label>


      <div className="sideBySide">
        {questions.map((question, index) => (
          <div key={index} className="question-block">
            <label>
              Question {index + 1}:
              <input
                type="text"
                value={question.content}
                onChange={(e) =>
                  questionChange(index, "content", e.target.value)
                }
              />
            </label>

            <label>
              Correct Answer:
              <input
                type="text"
                value={question.correct}
                onChange={(e) =>
                  questionChange(index, "correct", e.target.value)
                }
              />
            </label>

            <label>
              Incorrect Answers (comma-separated):
              <input
                type="text"
                value={question.incorrectAnswers.join(",")}
                onChange={(e) =>
                  questionChange(index, "incorrectAnswers", e.target.value)
                }
              />
            </label>
          </div>
        ))}

        <button onClick={addQuestion}>Add Another Question</button>
      </div>

      <button onClick={createQuiz}>Create Quiz</button>

    </div>
  )
}

export default QuizCreate
