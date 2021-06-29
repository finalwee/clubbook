import {React, useState} from 'react';
import {
  Grid,
  Button,
  TextField,
  Divider
} from '@material-ui/core';
import { useCommonProps } from '../containers/ClubBook';



function SignIn({setEnter}) {

    const [password, setPassWord] = useState('');
    const {setMe} = useCommonProps();

  return (
        <Grid container alignItems="flex-start" spacing={2}>
            <Grid item xs={12}>
                <TextField 
                    fullWidth
                    label="Username" 
                    type="text" 
                    variant="outlined" 
                    onChange={evt => setMe(evt.target.value)}
                />
            </Grid>
            <Grid item xs={12}>
                <TextField
                    fullWidth
                    label="Password"
                    type="password"
                    autoComplete="current-password"
                    variant="outlined"
                />
            </Grid>
            <Button variant="contained" color="primary" 
                style={{width: 260, marginLeft: 10, marginTop: 3, marginBottom: 3}}
                onClick={()=>setEnter(true)}
            >
                SUBMIT
            </Button>
            <Divider style={{marginTop: 15, width: 280, height: 3, backgroundColor: 'rgb(77, 73, 73)'}}/>
        </Grid>
  );
}


export default SignIn;