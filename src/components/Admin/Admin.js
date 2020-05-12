import React, { useState } from 'react';
import { Navbar, Container, Card, Form, Button } from 'react-bootstrap';
import { useFormik } from 'formik';
import { Redirect } from 'react-router-dom';
import firebase from '../../firebase'
import './Admin.css'
var examInfo;
const Admin = (props) => {
    const [toHome, setToHome] = useState(false);
    const [toQuestion, setToQuestion] = useState(false);
    const formik = useFormik({
        initialValues: {

            'exam_id': '',
            'exam_name': '',
            'duration': '',
            'exam_date': '',
            'exam_time': '',
            'total_marks': 0,
            'total_questions': 0
        },
        onSubmit: async values => {
            examInfo = { ...values }
            var ref = await firebase.firestore().collection('tests').doc(values.exam_id)
            await ref.set({
                isActive: true,
                exam_duration: values.duration,
                exam_id: values.exam_id,
                exam_name: values.exam_name,
                exam_marks: values.total_marks,
                exam_total_questions: values.total_questions
            });
            setToQuestion(true)
        }
    })
    if (toQuestion) {
        console.log(examInfo)
        return (
            <Redirect
                to={{
                    pathname: '/question',
                    state: {
                        examDetails: examInfo
                    }
                }}
            />
        )
    }
    return (
        <div>
            <Navbar expand="lg" variant="dark" bg="info">
                <Container>
                    <Navbar.Brand href="#" className="navbar-logo">
                        <h2>Questions Form</h2>
                    </Navbar.Brand>
                    <h4 style={{ color: 'white', float: 'right', padding: '15px' }}>Welcome Admin</h4>
                    <Button onClick={() => setToHome(true)} style={{ float: 'right' }} type="submit" variant="light">
                        LOGOUT
                    </Button>
                </Container>
            </Navbar>
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
                                    type="time"
                                    id="duration"
                                    name="duration"
                                    placeholder="Enter Exam Duration"
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
                            <Form.Group>
                                <Button type="submit">Create Exam</Button>
                            </Form.Group>
                        </Form>
                    </Card.Header>
                </Card>
            </div>
        </div>
    );
};

export default Admin;