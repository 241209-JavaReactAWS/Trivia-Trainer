import { SyntheticEvent, useState } from "react";
import "./QuizCreate.css"
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { Course } from "../interfaces/Course";

function QuizCreate() {

  const [quizName, setQuizName] = useState("")
  const [timer, setTimer] = useState(0)
  const [attemptLimit, setAttemptLimit] = useState(0)
  const [questions, setQuestions] = useState(
    [{
      content: "", correct: "", incorrectAnswers: ["", "", ""]
    }])
  const location = useLocation();
  const navigate = useNavigate();

  const course: Course = location.state?.course;

  const questionChange = (index: number, field: "content" | "correct" | "incorrectAnswers", value: string) => {
    const updatedQuestions = [...questions]
    if (field === "incorrectAnswers") {
      updatedQuestions[index].incorrectAnswers = value.split(",")
    }
    else if (field === "content") {
      updatedQuestions[index].content = value;
    }
    else if (field === "correct") {
      updatedQuestions[index].correct = value;
    }
    setQuestions(updatedQuestions);
  }

  const addQuestion = () => {
    setQuestions([
      ...questions, { content: "", correct: "", incorrectAnswers: ["", "", ""] }
    ])
  }

  const removeQuestion = (index: number) => {
    const updatedQuestions = questions.filter((_, i) => i !== index);
    setQuestions(updatedQuestions);
  };

  let createQuiz = () => {
    if (!quizName.trim()) {
      alert("Please enter a quiz name")
      return
    }
    if (timer <= 0 || attemptLimit <= 0) {
      alert("Please enter a valid time limit and attempt limit")
      return
    }
    if (questions.some(question => !question.content.trim() || !question.correct.trim() || question.incorrectAnswers.some(answer => !answer.trim()))) {
      alert("Please fill out all question fields")
      return
    }

    // Create the list of question objects using the questions useState variable
    const questionObjects = questions.map((question) => ({
      content: question.content,
      options: [...question.incorrectAnswers, question.correct].join(","),
      correct: question.correct,
    }));

    // TODO: Axios request to create the quiz 
    axios.post("http://localhost:8080/quizzes", {
      "courseId": course.courseId,
      "title": quizName,
      "timer": timer,
      "attemptLimit": attemptLimit,
      "questions": questionObjects
    }
      // { withCredentials: true }
    ).then((res) => {
      console.log(res.data)
      // console.log("Quiz Created! ", quizData)
      // console.log("Questions Made! ", questionObjects)
      alert("Quiz Created! Check the console for the quiz data")
      // navigate("/courseCreate")
    }).catch((err) => {
      console.log(err)
    })
  }

  return (
    <div>
      <h1>Create a Quiz </h1>

      {/* <h1>{course.courseId}</h1> */}

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
        Time Limit (in minutes):{" "}
        <input
          type="number"
          id="timerField"
          value={timer}
          onChange={(e: SyntheticEvent) => {
            setTimer((e.target as HTMLInputElement).value as unknown as number);
          }}
        />
      </label>
      <br></br>
      <br></br>
      <label>
        {/*Whenever thte text inside the username or password fields change, it will update the state variable*/}
        Attempt Limit:{" "}
        <input
          type="number"
          id="attemptLimitField"
          value={attemptLimit}
          onChange={(e: SyntheticEvent) => {
            setAttemptLimit((e.target as HTMLInputElement).value as unknown as number);
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

            <br></br>
            <br></br>

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

            <br></br>
            <br></br>

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

            <br></br>
            <br></br>

            <button onClick={() => removeQuestion(index)}>Remove Question</button>

            <br></br>
            <br></br>

          </div>

        ))}

        <button onClick={addQuestion}>Add Another Question</button>
      </div>

      <button onClick={createQuiz}>Create Quiz</button>
      <button onClick={() => navigate("/courseInfo", { state: { course } })}>
        Go Back
      </button>

    </div>
  )
}

export default QuizCreate
