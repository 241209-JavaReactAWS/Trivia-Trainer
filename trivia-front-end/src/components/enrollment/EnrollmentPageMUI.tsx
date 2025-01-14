import axios from "axios";
import { useEffect, useState } from "react";
import { Enrollment } from "../interfaces/Enrollment";
import { Course } from "../interfaces/Course";
import { PaymentDTO } from "../interfaces/PaymentDTO";
import { Button, CssBaseline, Paper, styled, Table, TableBody, TableCell, tableCellClasses, TableContainer, TableHead, TableRow } from "@mui/material";
import AppTheme from "../shared-theme/AppTheme";
import ColorModeSelect from "../shared-theme/ColorModeSelect";

function EnrollmentPageMUI(props: { disableCustomTheme?: boolean }) {

    const [enrollments, setEnrollments] = useState<Enrollment[]>([])
    const [deletedCourse, setDeletedCourse] = useState<number>(0)
    const backendUrl = import.meta.env.VITE_BACKEND_URL;

    //Note: Remove from this page during integration with Sanjana's course search
    useEffect(() => {
        axios.get<Enrollment[]>(`${backendUrl}/enrollment/${localStorage.getItem("student_id")}`
        ).then((res) => {
            console.log("Here are the current enrollments in the database: ", res.data);
            setEnrollments(res.data)
        }).catch((err) => {
            console.log(err);
        })
    }, [deletedCourse])

    let payFee = (course: Course, enrollId: number) => {
        console.log(course)
        console.log("Making Payment");
        console.log(`Student ID: ${localStorage.getItem("student_id")}`);
        console.log(`Course ID: ${course.courseId}`);
        console.log(`Amount: ${course.fee}`);
        let studentStr = localStorage.getItem("student_id")
        if (studentStr != null) {
            let newPaymentDTO: PaymentDTO = {
                studentId: parseInt(studentStr),
                courseId: course.courseId,
                amount: course.fee
            }
            console.log(newPaymentDTO)
            axios.post(`${backendUrl}/payment`, newPaymentDTO)
                .then((res) => {
                    console.log(res.data)
                }).catch((err) => {
                    console.log(err)
                })
            //Update payment status to paid
            axios.patch(`${backendUrl}/enrollment/payFee/${enrollId}`)
                .then((res) => {
                    setDeletedCourse(enrollId)
                    console.log(`Paid for enrollment ${enrollId}`)
                    console.log(res.data)
                }).catch((err) => {
                    console.log(err)
                })
        }
    }

    let leaveCourse = (enrollment: Enrollment) => {
        console.log(enrollment.enrollmentId)
        console.log(enrollment)
        console.log(typeof enrollment.status)
        let studentStr = localStorage.getItem("student_id")
        if (studentStr != null) {
            //Make a refund payment
            console.log(enrollment.status)
            var statusString = enrollment.status.toString()
            console.log(statusString)
            if (statusString === "ACTIVE") {
                //Issue refund if payment ACTIVE
                let newPaymentDTO: PaymentDTO = {
                    studentId: parseInt(studentStr),
                    courseId: enrollment.course.courseId,
                    amount: -enrollment.course.fee
                }
                console.log(newPaymentDTO)
                axios.post(`${backendUrl}/payment`, newPaymentDTO)
                    .then((res) => {
                        console.log(res.data)
                        console.log("Refund issued")
                    }).catch((err) => {
                        console.log(err)
                    })
            }

            //Delete the enrollment
            axios.delete(`${backendUrl}/enrollment/${enrollment.enrollmentId}`).
                then(() => {
                    setDeletedCourse(enrollment.enrollmentId)
                    console.log(`Deleted enrollment ${enrollment.enrollmentId}`)
                }).
                catch((err) => {
                    console.log(err);
                })
        }
    }
    /* Styling the Enrollment Table */
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
                <h1>Enrollment Table</h1>
                {/* MUI Table */}
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 700 }} aria-label="customized table">
                        <TableHead>
                            <TableRow>
                                <StyledTableCell>Course ID</StyledTableCell>
                                <StyledTableCell align="right">Course Name</StyledTableCell>
                                <StyledTableCell align="right">Enrollment Status&nbsp;</StyledTableCell>
                                <StyledTableCell align="right">Entrance Fee ($)&nbsp;</StyledTableCell>
                                <StyledTableCell align="right">&nbsp;</StyledTableCell>
                                <StyledTableCell align="right">&nbsp;</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {enrollments.map((enrollment) => (
                                <StyledTableRow key={enrollment.enrollmentId}>
                                    <StyledTableCell component="th" scope="row">
                                        {enrollment.course.courseId}
                                    </StyledTableCell>
                                    <StyledTableCell align="right">{enrollment.course.name}</StyledTableCell>
                                    <StyledTableCell align="right">{enrollment.status}</StyledTableCell>
                                    <StyledTableCell align="right">{enrollment.course.fee}</StyledTableCell>
                                    <StyledTableCell align="right">
                                        <Button size="small" variant="contained" onClick={() => payFee(enrollment.course, enrollment.enrollmentId)}>Pay</Button>
                                    </StyledTableCell>
                                    <StyledTableCell align="right">
                                        <Button size="small" variant="contained" onClick={() => leaveCourse(enrollment)}>Leave</Button>
                                    </StyledTableCell>


                                </StyledTableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>


            </div>
        </AppTheme>
    )
}

export default EnrollmentPageMUI
