import * as React from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

export default function Login() {
    return (
        <Form>
    
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" />
          <Form.Text className="text-muted">
            We`&apos;`ll never share your email with anyone else.
          </Form.Text>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      );
}