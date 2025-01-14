import { SyntheticEvent, useState } from "react";
import "./QuizCreate.css"
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { Course } from "../interfaces/Course";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

function QuizCreate() {

  // State variables 
  const [quizName, setQuizName] = useState("")
  const [timer, setTimer] = useState(0)
  const [attemptLimit, setAttemptLimit] = useState(0)
  const [questions, setQuestions] = useState(
    [{
      content: "", correct: "", incorrectAnswers: ["", "", ""]
    }])

  // Usable things from react-router-dom
  const location = useLocation();
  const navigate = useNavigate();

  const course: Course = location.state?.course;

  // Change the question information based on the input values
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

  // Function responsible for adding a question to the quiz
  const addQuestion = () => {
    setQuestions([
      ...questions, { content: "", correct: "", incorrectAnswers: ["", "", ""] }
    ])
  }

  // Function responsible for removing the last question from the quiz
  const removeQuestion = (index: number) => {
    const updatedQuestions = questions.filter((_, i) => i !== index);
    setQuestions(updatedQuestions);
  };

  // Function responsible for creating the quiz 
  let createQuiz = () => {
    // Check if the quiz has a name
    if (!quizName.trim()) {
      alert("Please enter a quiz name")
      return
    }
    // Check if the time and attemptLimit values are valid 
    if (timer <= 0 || attemptLimit <= 0) {
      alert("Please enter a valid time limit and attempt limit")
      return
    }
    // Check if all question fields requested are populated 
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

    // Send the POST request to the server to create the quiz
    axios.post(`${backendUrl}/quizzes`, {
      "courseId": course.courseId,
      "title": quizName,
      "timer": timer,
      "attemptLimit": attemptLimit,
      "questions": questionObjects
    }
    ).then((res) => {
      console.log(res.data)
      alert("Quiz Created! Check the console for the quiz data")
      navigate("/proctorHome")
    }).catch((err) => {
      console.log(err)
    })
  }

  return (
    <div>
      <h1>Create a Quiz </h1>

      {/* Get the name of the quiz */}
      <label>
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
      {/* Get the time limit for the quiz  */}
      <label>
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
      {/* Get the attempt limit for the quiz from the user */}
      <label>
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

      {/* Responsible for making question fields for the educator to fill out */}
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
            {/* Input correct answers here */}
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
            {/* Input incorrect answers here */}
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
            {/* Remove the recently-made question */}
            <button onClick={() => removeQuestion(index)}>Remove Question</button>

            <br></br>
            <br></br>

          </div>

        ))}
        {/* Button to add the quiz */}
        <button onClick={addQuestion}>Add Another Question</button>
      </div>
      {/* Button to create the quiz */}
      <button onClick={createQuiz}>Create Quiz</button>
      {/* Button to go back to the course info page */}
      <button onClick={() => navigate("/proctorHome", { state: { course } })}>
        Go Back
      </button>

    </div>
  )
}

export default QuizCreate
