import React, { Component, useState, useEffect, useRef } from 'react';
import csv from 'csv';
import Dropzone from 'react-dropzone';


const QuestionXLS = () => {
    
    const [flag,setFlag]=useState(false);
    const questions_xls = useRef([]);
    console.log(questions_xls.current);
    useEffect(()=>{
        setFlag(true)

    })
    const onDrop = (files) => {

        var file = files[0];
        const reader = new FileReader();
        reader.onload = () => {
            csv.parse(reader.result, (err, data) => {


                for (var i = 1; i < data.length; i++) {
                    const question = data[i][0];
                    const option1 = data[i][1];
                    const option2 = data[i][2];
                    const option3 = data[i][3];
                    const option4 = data[i][4];
                    const correct_answer = data[i][5];
                    const allocated_marks = data[i][6];
                    const newQuestion = {
                        "question": question,
                        "options": [option1, option2, option3, option4],
                        "correct_answer": correct_answer,
                        "allocated_marks": allocated_marks
                    };
                    questions_xls.current.push(newQuestion);

                    // fetch('https://[FIREBASE_URL]/users.json', {
                    //  method: 'POST',
                    //  headers: {
                    //      'Accept': 'application/json',
                    //      'Content-Type': 'application/json',
                    //  },
                    //  body: JSON.stringify(newUser)
                    // })
                };
            });
        };

        reader.readAsBinaryString(file);
        setFlag(true);

        console.log(questions_xls.current)
    }


    return (
        
        <div>
    
            {questions_xls.current.length === 0 ? (
                    <div className="dropzone" style={{ background: "white" }}>
                        <br /><br /><br />
                        <Dropzone className="Drop"
                            accept=".csv"
                            onDropAccepted={onDrop}
                        >
                            {({ getRootProps, getInputProps }) => (
                                <div {...getRootProps()}>
                                    <input {...getInputProps()} />
                                    <p>Drag 'n' drop some files here, or click to select files</p>
                                </div>
                            )}
                        </Dropzone>
                        <br /><br /><br />
                    </div>

                ): 
                <div style={{background:"white"}}>
                {questions_xls.current.map((obj,idx)=>(
                <h1 style={{color:"white"}}>{obj} at {idx}</h1>,
                console.log(obj))
                )}
            </div>
            }
        </div>)

}



export default QuestionXLS;