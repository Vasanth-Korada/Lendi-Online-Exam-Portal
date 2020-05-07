import React from 'react';
import './App.css';
import Login from './Auth/Login';
import {Navbar, Card} from 'react-bootstrap';

function App() {
  return (
    <div className="App">
       <Navbar className='Navbar' fixed='top' bg="dark">
          <Navbar.Brand href="#home">
            <h1>Exam</h1>
          </Navbar.Brand>
        </Navbar>
      <div className="Login">
        <Card>
            <Login/>
        </Card>
      </div>
      
    </div>
  );
}

export default App;
