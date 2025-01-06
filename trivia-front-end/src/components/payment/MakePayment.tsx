import axios from "axios";
import { SyntheticEvent, useState } from "react";
import { Payment } from "../interfaces/Payment";
import { Link } from "react-router-dom";

function Test1() {
  //const [paymentId, setPaymentId] = useState<number>(0);
  const [studentId, setStudentId] = useState<number>(0);
  const [courseId, setCourseId] = useState<number>(0);
  const [amount, setAmount] = useState<number>(0);
  // const [date, setDate] = useState<string>("");

  //Make this a post mapping
  let makePay = () => {
    console.log("Making Payment");
    console.log(`Student ID: ${studentId}`);
    //console.log(`Payment ID: ${paymentId}`);
    console.log(`Course ID: ${courseId}`);
    console.log(`Amount: ${amount}`);
    let newPayment : Payment = {
      studentId: studentId,
      courseId: courseId,
      date: "1/1/25",
      status: 0
    }
    axios.post("http://localhost:8080/payment", newPayment)
      .then((res) => {
        console.log(res.data)
      }).catch((err) => {
        console.log(err)
      })
  }

  return (
    <>
{/* {    <h1>Payment Test</h1>
    <label>
      Payment Id:{" "}
      <input
        type="number"
        id="paymentIdField"
        value={paymentId}
        onChange={(e: SyntheticEvent) => {
          setPaymentId(
            (e.target as HTMLInputElement).value as unknown as number
          );
        }}
      />} 
            </label>*/}

      <br></br>
      <br></br>
      <label>
        Student Id:{" "}
        <input
          type="number"
          id="studentIdField"
          value={studentId}
          onChange={(e: SyntheticEvent) => {
            setStudentId(
              (e.target as HTMLInputElement).value as unknown as number
            );
          }}
        />
      </label>
      <br></br>
      <br></br>
      <label>
        Course Id:{" "}
        <input
          type="number"
          id="courseIdField"
          value={courseId}
          onChange={(e: SyntheticEvent) => {
            setCourseId(
              (e.target as HTMLInputElement).value as unknown as number
            );
          }}
        />
      </label>
      <br></br>
      <br></br>
      <label>
        Amount:{" "}
        <input
          type="number"
          id="studentIdField"
          value={amount}
          onChange={(e: SyntheticEvent) => {
            setAmount(
              (e.target as HTMLInputElement).value as unknown as number
            );
          }}
        />
      </label>

      {/* Date should be taken from the current date now */}

      <br></br>
      <br></br>

      <button onClick={makePay}>Make Payment</button>
      {/* 
      Should connect to a function which creates the Payment object, 
      sends it to the backend, and print it out on the console 
      */}
      <br></br>
      <br></br>
      <Link to="/paymentHistory">Payment History</Link>
    </>
  );
}

export default Test1;
