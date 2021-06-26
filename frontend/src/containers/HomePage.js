import { useState } from 'react';
import {
Typography,
CssBaseline,
Paper,
Grid,
List,
ListItem,
ListItemText,
} from '@material-ui/core';
import SideBar from "../components/SideBar";
import ChatRoom from './ChatRoom';
import Search from '../components/Search';

function HomePage({me, displayStatus}) {
    
    return(
        <div className="homepage">
            <SideBar/>
            <div className="clubsearch">
                <Search type='Club' me={me}/>
            </div>
            <div className="main" style={{ padding: 16, margin: 'auto', maxWidth: 600 }}>
                <CssBaseline />
                <Typography variant="h4" align="center" component="h1" gutterBottom>
                    &#x2663; Club Book &#x1F4DA;
                </Typography>
            </div>
            <div className="friendsearch">
                <Search type='Friend' me={me}/>
            </div>
            <div className="chatroom">
                <ChatRoom me={me} displayStatus={displayStatus}/>
            </div>
        </div>
    );
};

export default HomePage;