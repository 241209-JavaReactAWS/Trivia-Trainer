import { useEffect, useState } from "react"
import { Payment } from "../interfaces/Payment"
import axios from "axios"


function PaymentHistory() {

  const [payments, setPayments] = useState<Payment[]>([])
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  //Add a UseEffect to get the current user's payments

  //Change this endpoint from Get All Payments to Get Payments by user ID
  useEffect(() => {
    axios.get<Payment[]>(`${backendUrl}/payment`)
      .then((res) => {
        setPayments(res.data)
        console.log(res.data)
      })
  }, [])

  return (
    <div>
      <h1>Payment History</h1> 
      <table>
        <thead>
          <tr>
            <th>Payment ID</th>
            <th>Student ID</th>
            <th>Course</th>
            <th>Amount</th>
            {/* Add Date and Status*/}
          </tr>
        </thead>
        <tbody>
          {
            payments.map((payment) => {
              return (
                <tr key={payment.payment_id}>
                  <td>{payment.payment_id}</td>
                  <td>{payment.student.studentId}</td>
                  <td>{payment.course.name}</td>
                  <td>{payment.amount}</td>
                </tr>
              )
            })
          }
        </tbody>
      </table>
    </div>
  )
}

export default PaymentHistory
