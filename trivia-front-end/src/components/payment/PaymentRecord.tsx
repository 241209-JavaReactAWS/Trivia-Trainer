import { Payment } from "../interfaces/Payment"

function PaymentRecord(props: Payment) {
  return (
    <div>
      <h2>{props.payment_date}</h2>
      {/* <p>{props.course}</p> */}
      <p>{props.status}</p>
    </div>
  )
}

export default PaymentRecord
