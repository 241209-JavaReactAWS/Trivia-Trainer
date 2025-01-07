import { useEffect, useState } from "react"
import { Payment } from "../interfaces/Payment"
import axios from "axios"


function PaymentHistory() {

  const [payments, setPayments] = useState<Payment[]>([])

  //Add a UseEffect to get the current user's payments

  //Change this endpoint from Get All Payments to Get Payments by user ID
  useEffect(() => {
    axios.get<Payment[]>("http://localhost:8080/payment")
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
            <th>Student ID</th>
            <th>Payment ID</th>
            <th>Course ID</th>
            {/* Add Date and Status*/}
          </tr>
        </thead>
        <tbody>
          {
            payments.map((payment) => {
              return (
                <tr key={payment.payment_id}>
                  <td>{payment.student}</td>
                  <td>0</td>
                  <td>{payment.course}</td>
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
