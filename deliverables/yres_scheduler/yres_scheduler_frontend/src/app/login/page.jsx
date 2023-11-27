'use client'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import {signIn} from 'next-auth/react'
import { useRouter } from 'next/navigation';

// Login page body
function Login() {
  const router = useRouter();
  const onSubmit = async (e) => {
    e.preventDefault();
    const response = await signIn("credentials", {
      username: e.target[0].value,
      password: e.target[1].value,
      redirect: false,
    });
    if (response.ok) {
      router.push("/");
    } else {
      console.log(response)
    }
    
  }

  return (
    <div>
      <div id='login-message' className='center-align'>
          This is a YRES Internal Tool<br/>
          Login to proceed
      </div>
      <Form onSubmit={onSubmit} id='login-form'>
        <Form.Group className="mb-3" controlId="username">
            <Form.Label>Username</Form.Label>
            <Form.Control type="text" placeholder="Username" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" />
        </Form.Group>
        <Button variant="primary" type="submit">
            Login
        </Button>
      </Form>
    </div>
  );
}

export default Login;
