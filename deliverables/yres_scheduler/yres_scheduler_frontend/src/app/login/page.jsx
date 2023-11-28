'use client'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import {signIn} from 'next-auth/react'
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Alert from 'react-bootstrap/Alert';

// Login page body
function Login() {
  const router = useRouter();
  const [showErr, setShowErr] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const onSubmit = async (e) => {
    e.preventDefault();
    const response = await signIn("credentials", {
      username: e.target[0].value,
      password: e.target[1].value,
      redirect: false,
    });
    if (response.ok) {
      // Redirect to a previous page the user was on
      const res_url = new URL(response.url);
      const callback = res_url.searchParams.get("callbackUrl")
      if (callback) {
        const callback_url = new URL(callback);
        router.push(callback_url.pathname);
      } else {
        // ...or default to profiles
        router.push("/profiles");
      }
    } else {
      setShowErr(true);
      setErrMsg(response.error);
    }
    
  }

  return (
    <div>
      <div id='login-message' className='center-align'>
          This is a YRES Internal Tool<br/>
          Login to proceed
      </div>
      <Alert show={showErr} variant="danger" onClose={() => setShowErr(false)} dismissible>
        {errMsg}
      </Alert>
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
