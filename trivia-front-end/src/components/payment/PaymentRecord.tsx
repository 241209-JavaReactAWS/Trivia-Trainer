import { Payment } from "../interfaces/Payment"

function PaymentRecord(props: Payment) {
  return (
    <div>
      <h2>{props.date}</h2>
      <p>{props.courseId}</p>
      <p>{props.status}</p>
    </div>
  )
}

export default PaymentRecord
