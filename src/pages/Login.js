import React, {useState} from 'react';
import { Button, Form, Input } from 'antd';
import * as Realm from "realm-web";
import { useRealmApp } from '../RealmApp';

export default function Login(){
    const app = useRealmApp();
    const [email, setEmail] = React.useState("saxbeck.patrick@gmail.com");
    const [password, setPassword] = React.useState("patsax0299");
    const [error, setError] = React.useState({});

    const [isLoggingIn, setIsLoggingIn] = React.useState(false)

    const handleLogin = async () => {
        setIsLoggingIn(true);
        setError((e) => ({...e, password: null}))
        try {
            console.log(email, password);
            await app.logIn(Realm.Credentials.emailPassword(email, password))
        } catch(err) {
            handleAuthenticationError(err, setError);
            console.log(error);
            console.log(email, password);
        }
    }

    return (
        <Form form name='login' autoComplete='off' onFinish={handleLogin}>
            <Form.Item label="Username" name="username"><Input/></Form.Item>
            <Form.Item label="Password" name="password"><Input.Password/></Form.Item>
            <Form.Item wrapperCol={{span:8}}>
                <Button type="primary" htmlType="submit">Submit</Button>
            </Form.Item>
        </Form>
    );
}

function handleAuthenticationError(err, setError) {
    const { status, message } = parseAuthenticationError(err);
    const errorType = message || status;
    switch (errorType) {
      case "invalid username":
        setError((prevErr) => ({ ...prevErr, email: "Invalid email address." }));
        break;
      case "invalid username/password":
      case "invalid password":
      case "401":
        setError((err) => ({ ...err, password: "Incorrect password." }));
        break;
      case "name already in use":
      case "409":
        setError((err) => ({ ...err, email: "Email is already registered." }));
        break;
      case "password must be between 6 and 128 characters":
      case "400":
        setError((err) => ({
          ...err,
          password: "Password must be between 6 and 128 characters.",
        }));
        break;
      default:
        break;
    }
  }

  function parseAuthenticationError(err) {
    const parts = err.message.split(":");
    const reason = parts[parts.length - 1].trimStart();
    if (!reason) return { status: "", message: "" };
    const reasonRegex = /(?<message>.+)\s\(status (?<status>[0-9][0-9][0-9])/;
    const match = reason.match(reasonRegex);
    const { status, message } = match?.groups ?? {};
    return { status, message };
  }