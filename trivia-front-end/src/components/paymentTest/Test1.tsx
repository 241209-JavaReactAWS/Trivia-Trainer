import { SyntheticEvent, useState } from "react";

function Test1() {
  const [paymentId, setPaymentId] = useState<number>(0);
  const [studentId, setStudentId] = useState<number>(0);
  const [courseId, setCourseId] = useState<number>(0);
  const [amount, setAmount] = useState<number>(0);
  // const [date, setDate] = useState<string>("");
  const [creditCardNumber, setCreditCardNumber] = useState<string>("");
  const [cvv, setCVV] = useState<string>("");
  const [billingAddress, setBillingAddress] = useState<string>("");

  let makePay = () => {
    console.log("Making Payment");
  };

  return (
    <>
      <h1>Payment Test</h1>

      <h4>Information that should be given for the payment</h4>

      <label>
        Credit Card Number:{" "}
        <input
          type="string"
          id="creditCardField"
          value={creditCardNumber}
          onChange={(e: SyntheticEvent) => {
            setCreditCardNumber(
              (e.target as HTMLInputElement).value as unknown as string
            );
          }}
        />
      </label>
      <br></br><br></br>
      <label>
        CVV:{" "}
        <input
          type="string"
          id="cvvField"
          value={cvv}
          onChange={(e: SyntheticEvent) => {
            setCVV(
              (e.target as HTMLInputElement).value as unknown as string
            );
          }}
        />
      </label>
      <br></br><br></br>
      <label>
        Billing Address:{" "}
        <input
          type="string"
          id="billingAddressField"
          value={billingAddress}
          onChange={(e: SyntheticEvent) => {
            setBillingAddress(
              (e.target as HTMLInputElement).value as unknown as string
            );
          }}
        />
      </label>


      <h4>Information that should be taken from other sources (course, students, etc.)</h4>
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
        />
      </label>
      <br></br><br></br>
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
    </>
  );
}

export default Test1;
