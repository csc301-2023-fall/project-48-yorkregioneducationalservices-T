'use client'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

// Login page body
function Login() {
  return (
    <div>
      <div id='login-message' className='center-align'>
          This is a YRES Internal Tool<br/>
          Login to proceed
      </div>
      <Form id='login-form'>
        <Form.Group className="mb-3" controlId="username">
            <Form.Label>Username</Form.Label>
            <Form.Control type="text" placeholder="Username" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" />
        </Form.Group>
        <Button variant="primary" type="submit" href='/schedules'>
            Login
        </Button>
      </Form>
    </div>
  );
}

export default Login;
