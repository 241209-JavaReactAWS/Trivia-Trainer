import { useEffect, useState } from "react"
import { Payment } from "../interfaces/Payment"
import axios from "axios"
import { CssBaseline, Paper, styled, Table, TableBody, TableCell, tableCellClasses, TableContainer, TableHead, TableRow } from "@mui/material";
import AppTheme from "../shared-theme/AppTheme";
import ColorModeSelect from "../shared-theme/ColorModeSelect";


function PaymentHistoryMUI(props: { disableCustomTheme?: boolean }) {

  const [payments, setPayments] = useState<Payment[]>([])
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  //Add a UseEffect to get the current user's payments

  //Change this endpoint from Get All Payments to Get Payments by user ID
  useEffect(() => {
    axios.get<Payment[]>(`${backendUrl}/payment/student/${localStorage.getItem("student_id")}`)
      .then((res) => {
        setPayments(res.data)
        console.log(res.data)
      })
  }, [])

  /* Styling the Payment Table */
  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));
  
  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));

  return (
    <AppTheme {...props}>
          <CssBaseline enableColorScheme />
          <ColorModeSelect sx={{ position: 'fixed', top: '1rem', right: '1rem' }} />
    <div>
      <h1>Payment History</h1> 
      <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Payment ID</StyledTableCell>
            <StyledTableCell align="right">Student ID</StyledTableCell>
            <StyledTableCell align="right">Course&nbsp;</StyledTableCell>
            <StyledTableCell align="right">Amount ($)&nbsp;</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {payments.map((payment) => (
            <StyledTableRow key={payment.payment_id}>
              <StyledTableCell component="th" scope="row">
                {payment.payment_id}
              </StyledTableCell>
              <StyledTableCell align="right">{payment.student.studentId}</StyledTableCell>
              <StyledTableCell align="right">{payment.course.name}</StyledTableCell>
              <StyledTableCell align="right">{payment.amount}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </div>
    </AppTheme>
  )
}

export default PaymentHistoryMUI
