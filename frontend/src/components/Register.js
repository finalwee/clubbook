import {React, useState} from 'react';
import {
  Typography,
  Paper,
  Grid,
  Button,
  CssBaseline,
  IconButton,
  Input,
  InputLabel,
  InputAdornment,
  FormHelperText,
  TextField,
} from '@material-ui/core';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
// Picker
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  DatePicker
} from '@material-ui/pickers';
import {useMutation} from '@apollo/react-hooks';
import {CREATE_USER_MUTATION} from "../graphql/Mutation";
import {UPDATE_USER_MUTATION} from "../graphql/Mutation";
import { useCommonProps } from '../containers/ClubBook';


function Register({setEnter}) {

  const [values, setValues] = useState({
    username: '',
    email: '',
    password_origin: '',
    password_again: '',
    favourite: ''
  });

  const [date, setDate] = useState(new Date());

  const [showPassword, setShowPassWord] = useState({
    origin: '',
    again: ''
  });

  const [helperText, setHelperText]  = useState({
    username: '',
    email: '',
    password_origin: "English letters and numbers only. Length > 5",
    password_again: "Should be the same as the above",
    favourite: ''
  })

  const [error, setError] = useState({
    username: false,
    email: false,
    password_origin: false,
    password_again: false
  });

  const [createUser] = useMutation(CREATE_USER_MUTATION);
  const [updateUser] = useMutation(UPDATE_USER_MUTATION);
  const {setMe} = useCommonProps();
  

  const Validate = (entity, value) => {

    let error = 0;

    switch(entity){
      // username   
      case 'username':
        if (value == ''){
          setError(error => {return {...error, username: true}});
          setHelperText(helperText => {return {...helperText, username: "Required!"}}); 
          error += 1;
        }else {
          setError(error => {return {...error, username: false}});
          setHelperText(helperText => {return {...helperText, username: ""}}); 
        }
        break;
      //email
      case 'email':
        if (value == ''){
          setError(error => {return {...error, email: true}});
          setHelperText(helperText => {return {...helperText, email: "Required!"}}); 
          error += 1;
        }else if (value.search('@') == -1 || value.search('@') == 0 || value.search('@') == value.length-1){
          setError(error => {return {...error, email: true}});
          setHelperText(helperText => {return {...helperText, email: "Invalid Email Address!"}}); 
          error += 1;
        }else{
          setError(error => {return {...error, email: false}});
          setHelperText(helperText => {return {...helperText, email: ""}}); 
        }
        break;
      //password_origin
      case 'password_origin':
        if (value == ''){
          setError(error => {return {...error, password_origin: true}});
          setHelperText(helperText => {return {...helperText, password_origin: "Required!"}}); 
          error += 1;
        }else if(value.match(/^[0-9a-zA-Z]+$/) == null){
          setError(error => {return {...error, password_origin: true}});
          setHelperText(helperText => {return {...helperText, password_origin: "English letters and numbers only!"}}); 
          error += 1;
        }else if(value.length < 5){
          setError(error => {return {...error, password_origin: true}});
          setHelperText(helperText => {return {...helperText, password_origin: "The length of the password should be larger than 5!"}}); 
          error += 1;
        }else{
          setError(error => {return {...error, password_origin: false}});
          setHelperText(helperText => {return {...helperText, password_origin: ""}}); 
        }
        break;
      //password_again
      case 'password_again':
        if (value == ''){
          setError(error => {return {...error, password_again: true}});
          setHelperText(helperText => {return {...helperText, password_again: "Required!"}}); 
          error += 1;
        }else if(value !== values.password_origin){
          setError(error => {return {...error, password_again: true}});
          setHelperText(helperText => {return {...helperText, password_again: "Not the same as the above!"}}); 
          error += 1;
        }else{
          setError(error => {return {...error, password_again: false}});
          setHelperText(helperText => {return {...helperText, password_again: ""}}); 
        }
        break;
    }
    return error;
  };

  const handleChange = (entity) => (event) =>{

    let value = event.target.value;
    setValues(values => {return { ...values, [entity]: value }});
    Validate(entity, value);    

  };

  const handleClickShowPassword  = (entity) => {
    if (entity == 'origin')setShowPassWord({origin: !showPassword.origin, again: showPassword.again});
    else setShowPassWord(showPassword => {return {origin: showPassword.origin, again: !showPassword.again}});
  };

  const handleSubmit = async () => {

    let error = 0;

    for (let [key, value] of Object.entries(values)){
      error += Validate(key, value);
    }
    if(error === 0){
      try{
        let user = await createUser({
            variables: {
            name: values.username,
            password: values.password_origin,
            },
          })
        let userId = user.data.createUser;
        await updateUser({
          variables: {
            username: values.username,
            email: values.email, 
            favourite: values.favourite, 
            }
          }
        );
        setMe(values.username);
        setEnter(true);

      }catch(e){
        if(e.message === 'User name existed'){
          setError(error => {return {...error, username: true}});
          setHelperText(helperText => {return {...helperText, username: values.username+" has been registered!"}});
        }
        else if(e.message === 'Invalid password'){
          setError(error => {return {...error, password_origin: true}});
          setHelperText(helperText => {return {...helperText, password_origin: 'Invalid password!'}});
        }
        console.log(e.message);
      }
    }
    
  }

  return (
    <div style={{ padding: 16, margin: 'auto', maxWidth: 600 }}>
      <CssBaseline />
      <Typography variant="h4" align="center" component="h1" gutterBottom>
      &#x2663; Club Book &#x1F4DA;
      </Typography>
      <Paper style={{ padding: 16 }}>
        <Grid container alignItems="flex-start" spacing={2}>
          <Grid item xs={12}>
            <TextField  
              fullWidth
              error={error.username}
              type="text"
              value={values.username}
              name="UserName"
              label="UserName"
              required
              onChange={handleChange('username')}
              helperText={helperText.username}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              error={error.email}
              type="text"
              value={values.email}
              name="Email"
              label="Email"
              required
              onChange={handleChange('email')}
              helperText={helperText.email}
            />
          </Grid>
          <Grid item xs={12}>
            <InputLabel error={error.password_origin}>PassWord*</InputLabel>
            <Input
              fullWidth
              error={error.password_origin}
              type={showPassword.origin ? 'text' : 'password'}
              value={values.password_origin}
              required
              onChange={handleChange('password_origin')}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={() => handleClickShowPassword('origin')}
                  >
                    {showPassword.origin ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              }
            />
            <FormHelperText>{helperText.password_origin}</FormHelperText>
          </Grid>
          <Grid item xs={12}>
            <InputLabel error={error.password_again}>PassWord Again*</InputLabel>
            <Input
              fullWidth
              error={error.password_again}
              type={showPassword.again ? 'text' : 'password'}
              value={values.password_again}
              required
              onChange={handleChange('password_again')}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={() => handleClickShowPassword('again')}
                  >
                    {showPassword.again ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              }
            />
            <FormHelperText>{helperText.password_again}</FormHelperText>
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              type="text"
              value={values.favourite}
              name="Favourite"
              label="Favourite"
              onChange={handleChange('favourite')}
              helperText={helperText.interest}
            />
          </Grid>
          <Grid item xs={12}>  
          </Grid>
          <Grid item xs={9}>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <DatePicker
                disableFuture
                openTo="year"
                format="yyyy/MM/dd"
                label="Date of birth"
                views={["year", "month", "date"]}
                value={date}
                onChange={date => setDate(date)}
              />
            </MuiPickersUtilsProvider>
          </Grid>
          <Grid item style={{ marginTop: 16 }}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleSubmit}
            >
              Submit
            </Button>
          </Grid>
        </Grid>
      </Paper>         
    </div>
  );
}




export default Register;