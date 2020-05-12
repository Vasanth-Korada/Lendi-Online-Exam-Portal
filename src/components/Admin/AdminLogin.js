import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import {Form,Button, Card} from 'react-bootstrap';
import "./AdminLogin.css"

const AdminLogin = () => {
 const [username,setUsername]=useState();
 const [password,setPassword]=useState();
 const [toAdminLogin, setToAdminLogin] = useState(false);
 const loginSubmit=(e)=>{
     e.preventDefault();
     console.log(username,password)
     if(username==="admin" && password==="1234"){
         setToAdminLogin(true);
     }
 }
 if(toAdminLogin){
    return(<Redirect
        to={{
            pathname: '/admin',
            state:{
                name:username
            }
        }}/>);
 }
    return (
        <div className="login">
				<br />
                <Card className="login-card" style={{ width: '28rem' }}>
				<Form className="form" onSubmit={loginSubmit}>
					<Form.Group>
						<Form.Label>Registration No: </Form.Label>
						<Form.Control
							type="text"
							placeholder="EG: LT12345"
							value={username}
							onChange={e=>setUsername(e.target.value)}
							required
						/>
					</Form.Group>
					<Form.Group>
						<Form.Label>Password: </Form.Label>
						<Form.Control
							type="password"
							placeholder="4 Digit PIN"
							value={password}
							onChange={e=>setPassword(e.target.value)}
							minLength="4"
							maxLength="4"
							required
						/>
					</Form.Group>
					<Form.Group>
						<Button
							style={{ marginLeft: '24%', width: '50%' }}
							type="submit"
							variant="outline-success"
							size="lg"
						>
							LOGIN
						</Button>
					</Form.Group>
				</Form>
                </Card>
				<br />
			</div>
    );
};

export default AdminLogin;