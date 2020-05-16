import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik'
import NavBar from '../NavBar';
import firebase from '../../firebase'
import { Redirect } from "react-router-dom"
import { Card, Form, Button, Tabs, Tab, Table, Col } from 'react-bootstrap';
import "./AdminDashboard.css"

var examInfo, Results = [];
const AdminDashboard = () => {
    const [recheck,setRecheck]=useState(false);
    const [toHome, setToHome] = useState(false);
    const [toQuestion, setToQuestion] = useState(false);
    const resultFormik = useFormik({
        initialValues: {
            'exam_id': ''
        },
        onSubmit: async values => {
            Results = []
            setRecheck(true)
            const ref = await firebase.firestore().collection('tests').doc(values.exam_id).collection('participants').orderBy('marks',"desc").get().then(
                async  snap => {

                    snap.docs.forEach(async doc => {
                        const data = doc.data()
                        Results.push(
                            {
                                id: doc.id,
                                attempted: data.isAttempted,
                                submitted: data.isSubmitted,
                                marks: data.marks
                            }
                        )
                    });
                }
            ).catch((e)=>{
                window.alert("Invalid Test ID!")
            })
            console.log(Results)
        }
    })
    const formik = useFormik({
        initialValues: {

            'exam_id': '',
            'exam_name': '',
            'duration': undefined,
            'exam_date': '',
            'exam_time': '',
            'total_marks': undefined,
            'total_questions': undefined,
            'Path': ''
        },
        onSubmit: async values => {
            examInfo = { ...values }
            const unixTime = new Date(values.exam_date + ',' + values.exam_time).getTime() / 1000;

            var ref = await firebase.firestore().collection('tests').doc(values.exam_id)
            await ref.set({
                isActive: false,
                exam_duration: values.duration,
                exam_time_unix: unixTime,
                exam_id: values.exam_id,
                exam_name: values.exam_name,
                exam_marks: values.total_marks,
                exam_total_questions: values.total_questions
            });
            console.log(values)
            setToQuestion(true)
        }
    })
    if (toQuestion) {
        console.log(examInfo)
        return (
            <Redirect
                to={{
                    pathname: examInfo.Path,
                    state: {
                        examDetails: examInfo
                    }
                }}
            />
        )
    }

    const reset = () => {
        setRecheck(false)
    }


    return (
        <div>
            <NavBar
                title="Welcome Admin"
            ></NavBar>
            <br />
            <Tabs defaultActiveKey="createExam" id="uncontrolled-tab-example">
                <Tab eventKey="createExam" title="Create Exam">
                    <div className="admin">
                        <Card>
                            <Card.Header as="h5">CREATE EXAM HERE :)</Card.Header>
                            <Card.Header>
                                <Form onSubmit={formik.handleSubmit}>
                                    <Form.Group>
                                        <Form.Label>Exam Id : </Form.Label>
                                        <Form.Control
                                            name="exam_id"
                                            id="exam_id"
                                            value={formik.values.exam_id}
                                            onChange={formik.handleChange}
                                            type="text"
                                            placeholder="Enter Exam Id"
                                            required
                                        ></Form.Control>
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Label>Exam Name : </Form.Label>
                                        <Form.Control
                                            type="text"
                                            id="exam_name"
                                            name="exam_name"
                                            placeholder="Enter Exam Name"
                                            value={formik.values.exam_name}
                                            onChange={formik.handleChange}
                                            required
                                        ></Form.Control>
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Label>Duration : </Form.Label>
                                        <Form.Control
                                            type="number"
                                            id="duration"
                                            name="duration"
                                            placeholder="Enter Exam Duration in Minutes only"
                                            value={formik.values.duration}
                                            onChange={formik.handleChange}
                                            required
                                        ></Form.Control>
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Label>Exam Date : </Form.Label>
                                        <Form.Control
                                            type="date"
                                            id="exam_date"
                                            placeholder="Enter Exam Id"
                                            name="exam_date"
                                            value={formik.values.exam_date}
                                            onChange={formik.handleChange}
                                            required
                                        ></Form.Control>
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Label>Exam Starting Time (24 Hrs format only) : </Form.Label>
                                        <Form.Control
                                            name="exam_time"
                                            id="exam_time"
                                            value={formik.values.exam_time}
                                            onChange={formik.handleChange}
                                            type="time"
                                            required
                                        ></Form.Control>
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Label>Total Marks : </Form.Label>
                                        <Form.Control type="text"
                                            name="total_marks"
                                            id="total_marks"
                                            placeholder="Enter Total Marks"
                                            value={formik.values.total_marks}
                                            onChange={formik.handleChange}
                                            required
                                        ></Form.Control>
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Label>Total Questions : </Form.Label>
                                        <Form.Control type="text"
                                            name="total_questions"
                                            id="total_questions"
                                            placeholder="Enter Total Questions"
                                            value={formik.values.total_questions}
                                            onChange={formik.handleChange}
                                            required
                                        ></Form.Control>
                                    </Form.Group>
                                    <Col sm={10}>
                                        <Form.Check
                                            type="radio"
                                            label="Enter Questions Manually"
                                            name="Path"
                                            value="/question"
                                            id="/question"
                                            onChange={formik.handleChange}
                                        />
                                        <Form.Check
                                            type="radio"
                                            label="Put CSV file"
                                            name="Path"
                                            id="/csv-upload"
                                            value="/csv-upload"
                                            onChange={formik.handleChange}

                                        />
                                    </Col>
                                    <br />
                                    <Form.Group>
                                        <Button type="submit">Create Exam</Button>
                                    </Form.Group>
                                </Form>
                            </Card.Header>
                        </Card>
                    </div>

                </Tab>
                <Tab eventKey="Results" title="Results">
                    <div className="admin">
                    <Form onSubmit={resultFormik.handleSubmit}>
                                    <Form.Group>
                                        <Form.Label>Enter Test ID</Form.Label>
                                        <Form.Control
                                            name="exam_id"
                                            id="exam_id"
                                            value={resultFormik.values.exam_id}
                                            onChange={resultFormik.handleChange}
                                            type="text"
                                            placeholder="Enter Exam Id"
                                            required
                                        ></Form.Control>
                                    </Form.Group>
                                    <Form.Group>
                                        <Button type="submit">Get Result</Button>
                                    </Form.Group>
                                </Form>
                        {Results.length ? (
                            <div>
                                <Table striped bordered hover size="sm">
                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>Roll Number</th>
                                            <th>Marks</th>
                                            <th>Attempted</th>
                                            <th>Submitted</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            Results.map(
                                                (obj, index) => (
                                                    <tr>
                                                        <td>{index + 1}</td>
                                                        <td>{obj.id}</td>
                                                        <td>{obj.marks}</td>
                                                        {(obj.attempted) ? (
                                                            <td>Yes</td>
                                                        ) : <td>No</td>
                                                        }

                                                        {
                                                            (obj.submitted ? (
                                                                <td>Yes</td>
                                                            ) :
                                                                <td>No</td>
                                                            )
                                                        }
                                                    </tr>
                                                )
                                            )
                                        }
                                    </tbody>
                                </Table>

                            </div>

                        ) : null
                            
                        }
                    </div>
                </Tab>
            </Tabs>
        </div>
    );
};

export default AdminDashboard;