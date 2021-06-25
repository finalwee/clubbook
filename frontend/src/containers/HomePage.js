import { useState } from 'react';
import {Typography,CssBaseline,} from '@material-ui/core';
import SideBar from "../components/SideBar";
// import { SearchBar } from 'react-native-elements';

function HomePage() {
    
    return(
        <div>
            <SideBar/>
            <div style={{ padding: 16, margin: 'auto', maxWidth: 600 }}>
                <CssBaseline />
                <Typography variant="h4" align="center" component="h1" gutterBottom>
                &#x2663; Club Book &#x1F4DA;
                </Typography>
            </div>
        </div>
    );
};

export default HomePage;