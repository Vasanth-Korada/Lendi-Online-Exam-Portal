import React, { Component, useEffect, useState } from 'react';
import { Navbar, Form, Card, Button, Row, Col, Container } from 'react-bootstrap';
import { useFormik } from 'formik';
import firebase from '../../firebase'
import "./Questions.css";
const Questions = (props) => {
    const [qno, setQno] = useState(0);
    const [examInfo, setExamInfo] = useState({});
    useEffect(async () => {
        setExamInfo(props.location.state.examDetails)
    }, []
    );
    const formik = useFormik({
        initialValues: {
            'question': '',
            'correct_answer': '',
            'allocated_marks': undefined,
            'options': []
        },
        
        onSubmit: async values => {
            console.log(examInfo.total_marks);
            console.log(values);
            setQno(qno + 1)
            var ref = await firebase.firestore().collection('tests').doc(examInfo.exam_id).update({
                questions: firebase.firestore.FieldValue.arrayUnion(values),
            })
            await ref.set({
                correctAnswer: values.correct_answer,
                marks: values.allocated_marks,
                question: values.question,
                options: values.options,
            });
            formik.values=formik.initialValues
        }
    })

    console.log(examInfo.total_questions);
    return (

        <div>
            {(examInfo === undefined || qno >= examInfo.total_questions) ? (<div>
                <h1 style={{ textAlign: 'center', color: "white" }}>Questions completed</h1>
                <h2 style={{ textAlign: 'center', color: "white" }}>Thank You ;)</h2>
            </div>) : (
                    <div className="question">
                        <Card >

                            <Card.Header as="h4">Exam Questions</Card.Header>
                            <Row>
                                <Col>
                                    <Card.Header style={{ width: "100%" }} as="h5">QuestionNo {qno + 1}</Card.Header>
                                </Col>
                                <Col>
                                    <Card.Header
                                        style={{ float: "left", width: "100%" }}
                                        as="h5"
                                    >
                                        Total No of Questions :{examInfo.total_questions}
                                    </Card.Header>
                                </Col>

                            </Row>
                            <Card.Header>
                                <Form onSubmit={formik.handleSubmit}>
                                    <Form.Group>
                                        <Form.Label>Question :</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="question"
                                            id="question"
                                            value={formik.values.question}
                                            onChange={formik.handleChange}
                                            placeholder="Enter Question"
                                        ></Form.Control>
                                    </Form.Group>
                                    <br />
                                    <Container>
                                        <Row>
                                            <Col>
                                                <Form.Label>Option 1 :</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    name="options[0]"
                                                    id="options[0]"
                                                    value={formik.values.options[0]}
                                                    onChange={formik.handleChange}
                                                    placeholder="Option 1"
                                                ></Form.Control>
                                            </Col>
                                            <Col>
                                                <Form.Label>Option 2 :</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    name="options[1]"
                                                    id="options[1]"
                                                    value={formik.values.options[1]}
                                                    onChange={formik.handleChange}
                                                    placeholder="Option 2"
                                                ></Form.Control>
                                            </Col>
                                            <Col>
                                                <Form.Label>Option 3 :</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    name="options[2]"
                                                    id="options[2]"
                                                    value={formik.values.options[2]}
                                                    onChange={formik.handleChange}
                                                    placeholder="Option 3"
                                                ></Form.Control>
                                            </Col>
                                            <Col>
                                                <Form.Label>Option 4 :</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    name="options[3]"
                                                    id="options[3]"
                                                    value={formik.values.options[3]}
                                                    onChange={formik.handleChange}
                                                    placeholder="Option 4"
                                                ></Form.Control>
                                            </Col>
                                        </Row>
                                    </Container>
                                    <br />
                                    <Form.Group>
                                        <Form.Label>Correct Answer :</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="correct_answer"
                                            id="correct_answer"
                                            value={formik.values.correct_answer}
                                            onChange={formik.handleChange}
                                            placeholder="Enter Correct Answer"
                                        ></Form.Control>
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Label>Allocated Marks :</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="allocated_marks"
                                            id="allocated_marks"
                                            value={formik.values.allocated_marks}
                                            onChange={formik.handleChange}
                                            placeholder="Allocated Marks"
                                        ></Form.Control>
                                    </Form.Group>
                                    <Form.Group>
                                        <Button type="submit">Submit</Button>
                                    </Form.Group>
                                </Form>
                            </Card.Header>
                        </Card>
                    </div>
                )}
        </div>
    )

};

export default Questions;