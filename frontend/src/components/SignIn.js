import {React, useState} from 'react';
import {
  Grid,
  Button,
  TextField,
  Divider
} from '@material-ui/core';
import {useMutation} from '@apollo/react-hooks';
import { useCommonProps } from '../containers/ClubBook';
import {USER_LOGIN_MUTATION} from "../graphql/Mutation";



function SignIn({setEnter}) {

    const [password, setPassWord] = useState('');
    const {me, setMe} = useCommonProps();
    const [helperText, setHelperText]  = useState({
        username: '',
        password: '',
    })
    const [error, setError] = useState({
        username: false,
        password: false
    });
    const [userLogin] = useMutation(USER_LOGIN_MUTATION);

    const handleChange = (entity) => (event) =>{
        let value = event.target.value;
        if(entity==='username'){
            setMe(value);
            if (value == ''){
                setError(error => {return {...error, username: true}});
                setHelperText(helperText => {return {...helperText, username: "Required!"}}); 
            }else {
                setError(error => {return {...error, username: false}});
                setHelperText(helperText => {return {...helperText, username: ""}}); 
            }
        }else{
            setPassWord(value);
            if (value == ''){
                setError(error => {return {...error, password: true}});
                setHelperText(helperText => {return {...helperText, password: "Required!"}}); 
            }else{
                setError(error => {return {...error, password: false}});
                setHelperText(helperText => {return {...helperText, password: ""}}); 
            }
        } 
    };

    const handleSubmit = async () => {
        try{
            let isvalid = await userLogin({
                variables: {
                name: me,
                password: password
                },
            });
            if(isvalid.data.userLogin)setEnter(true);
            else{
                setError(error => {return {...error, password: true}});
                setHelperText(helperText => {return {...helperText, password: "Password Incorrect!"}}); 
            }
        }catch(e){
            if(e.message === 'Missing name or password for User Login'){
                if (me == ''){
                    setError(error => {return {...error, username: true}});
                    setHelperText(helperText => {return {...helperText, username: "Required!"}}); 
                }
                if (password == ''){
                    setError(error => {return {...error, password: true}});
                    setHelperText(helperText => {return {...helperText, password: "Required!"}}); 
                }
            }else if(e.message === 'User did not exist'){
                setError(error => {return {...error, username: true}});
                setHelperText(helperText => {return {...helperText, username: "No such user!"}}); 
            }
        }   
    }

  return (
        <Grid container alignItems="flex-start" spacing={2}>
            <Grid item xs={12}>
                <TextField 
                    fullWidth
                    label="Username" 
                    type="text" 
                    variant="outlined" 
                    required
                    error={error.username}
                    helperText={helperText.username}
                    onChange={handleChange('username')}
                />
            </Grid>
            <Grid item xs={12}>
                <TextField
                    fullWidth
                    label="Password"
                    type="password"
                    required
                    error={error.password}
                    helperText={helperText.password}
                    autoComplete="current-password"
                    variant="outlined"
                    onChange={handleChange('password')}
                />
            </Grid>
            <Button variant="contained" color="primary" 
                style={{width: 260, marginLeft: 10, marginTop: 3, marginBottom: 3}}
                onClick={()=>handleSubmit()}
            >
                SUBMIT
            </Button>
            <Divider style={{marginTop: 15, width: 280, height: 3, backgroundColor: 'rgb(77, 73, 73)'}}/>
        </Grid>
  );
}


export default SignIn;