import React, { useState } from 'react';
import Register from "../components/Register"
import SignIn from '../components/SignIn';
import HomePage from './HomePage';
import { message } from "antd";
import { Paper, CssBaseline, Typography,  Button } from '@material-ui/core';

const displayStatus = (payload) => {
  if (payload.msg) {
    const { type, msg } = payload
    const content = {
      content: msg, duration: 0.5 }
    switch (type) {
      case 'success':
        message.success(content)
        break
      case 'error':
      default:
        message.error(content)
        break
}}};

function ClubBook() {

  const [username, setUserName] = useState('Peter');
  const [signin, setSignIn] = useState(true);
  const [enter, setEnter] = useState(false);

  return (
    enter ? 
      <HomePage me={username} displayStatus={displayStatus}/> : 
    signin ? 
      <div style={{ padding: 16, marginTop: 100, marginLeft: 500, maxWidth: 600 }}>
        <CssBaseline />
        <Typography variant="h4" align="center" component="h1" gutterBottom>
        &#x2663; Club Book &#x1F4DA;
        </Typography>
        <Paper style={{ width: 300, padding: 20, marginLeft: 130,}}>
          <SignIn setUserName={setUserName} setEnter={setEnter}/>
          <Button variant="contained" color="primary" 
            style={{width:100, marginLeft: 85, marginTop: 50, marginBottom: 3}}
            onClick={()=>setSignIn(false)}
          >
              CREATE
          </Button>
        </Paper>
      </div>
       :
      <Register setEnter={setEnter}/>
  );
}




export default ClubBook;