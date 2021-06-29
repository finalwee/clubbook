import React, { createContext, useState, useContext } from 'react';
import Register from "../components/Register"
import SignIn from '../components/SignIn';
import HomePage from './HomePage';
import { FlagProvider } from '../hooks/useFlag';
import { message } from "antd";
import { Paper, CssBaseline, Typography,  Button } from '@material-ui/core';

const CommonProps = createContext({
  me: '',
  setMe: ()=>{},
  displayStatus: ()=>{},
});

const CommonPropsProvider = (props) =>
{
  const [me, setMe] = useState('');
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

  return(
    <CommonProps.Provider
      value={{
        me,
        setMe,
        displayStatus,
      }}
      {...props}
    />
  );
}

function useCommonProps(){
  return useContext(CommonProps);
}

function ClubBook() {

  const [signin, setSignIn] = useState(true);
  const [enter, setEnter] = useState(false);
  
  return (
    enter ? 
    <CommonPropsProvider>
      <FlagProvider>
        <HomePage /> 
      </FlagProvider> 
    </CommonPropsProvider> : 
    signin ? 
      <CommonPropsProvider>
        <div style={{ padding: 16, marginTop: 100, marginLeft: 500, maxWidth: 600 }}>
          <CssBaseline />
          <Typography variant="h4" align="center" component="h1" gutterBottom>
          &#x2663; Club Book &#x1F4DA;
          </Typography>
          <Paper style={{ width: 300, padding: 20, marginLeft: 130,}}>
            <SignIn setEnter={setEnter}/>
            <Button variant="contained" color="primary" 
              style={{width:100, marginLeft: 85, marginTop: 50, marginBottom: 3}}
              onClick={()=>setSignIn(false)}
            >
                CREATE
            </Button>
          </Paper>
        </div>
      </CommonPropsProvider>
       :
      <Register setEnter={setEnter}/>
  );
}




export default ClubBook;

export {useCommonProps};