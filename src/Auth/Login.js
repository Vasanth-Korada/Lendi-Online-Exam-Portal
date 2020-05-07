import React, { Component } from 'react';
import {Form,Button} from 'react-bootstrap';
class Login extends Component {
    constructor(props){
        super(props);
        this.state={
            studentId:'0',//ActualId
            password:'0',//Actual Password
            loginId:'',//TypedId
            loginPassword:''//Typed Password
        }
        this.idChange=this.idChange.bind(this);
        this.passwordChange=this.passwordChange.bind(this);
        this.loginCredentials=this.loginCredentials.bind(this);
    }
    idChange(e){
        this.setState({loginId:e.target.value})

    }
    passwordChange(e){
        this.setState({loginPassword:e.target.value})
    }
    loginCredentials(e){
            e.preventDefault()
            console.log(this.state.loginPassword,this.state.loginId)
    }
    render() { 
        return (
            <div className="Login">
                <h2>Login</h2>
                <br/>
                <Form className="form" onSubmit={this.loginCredentials}>
                    <Form.Group>
                        <Form.Label>Registration Number : </Form.Label>
                        <Form.Control type='text'placeholder='Enter in Caps' value={this.state.loginId} onChange={this.idChange}></Form.Control>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Password : </Form.Label>
                        <Form.Control type='password'placeholder='Enter Password' value={this.state.loginPassword} onChange={this.passwordChange}></Form.Control>
                    </Form.Group>
                    <Form.Group>
                        <Button type="submit">Log in</Button>
                    </Form.Group>
                </Form>
                <br/>
            </div>
        );
    }
}

export default Login;