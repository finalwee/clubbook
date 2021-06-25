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
import SearchBar from "material-ui-search-bar";
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
    list: {
      width: '100%',
      maxWidth: 360,
      position: 'relative',
      overflow: 'auto',
      maxHeight: 300,
    },
  }));

function HomePage() {
    
    const [clubsearch, setClubSearch] = useState('');
    const [friendsearch, setFriendSearch] = useState('');
    const [clubs, setClubs] = useState(['Badminton', 'Tennis', 'Piano', 'Math', 'Web']);
    const [friends, setFriends] = useState(['Peter', 'Amy', 'Eric', 'Allen', 'Linda', 'Sherry']);
    const [club_selected, setClubSelected] = useState('');
    const [friend_selected, setFriendSelected] = useState('');
    const classes = useStyles();

    return(
        <div className="homepage">
            <SideBar/>
            <div className="clubsearch">
                <Paper>
                    <SearchBar
                        placeholder="Search Club"
                        value={clubsearch}
                        onChange={(newValue) => setClubSearch(() => {return newValue;})}
                        onRequestSearch={() => {}}
                    />
                    {clubs.length===0 ? <></> :
                        <List className={classes.list}>
                            {clubs.map(item => {return(
                                <ListItem
                                    button
                                    key={item}
                                    onClick={() => {setClubSelected(item);setClubs([]);}}
                                >
                                    <ListItemText primary={item} />
                                </ListItem>
                            )})}
                        </List>
                    }   
                </Paper>
            </div>
            <div className="main" style={{ padding: 16, margin: 'auto', maxWidth: 600 }}>
                <CssBaseline />
                <Typography variant="h4" align="center" component="h1" gutterBottom>
                    &#x2663; Club Book &#x1F4DA;
                </Typography>
            </div>
            <div className="friendsearch">
                <Paper>
                    <SearchBar
                        placeholder="Search Friend"
                        value={friendsearch}
                        onChange={(newValue) => setFriendSearch(() => {return newValue;})}
                        onRequestSearch={() => {}}
                    />
                    {friends.length===0 ? <></> :
                        <List className={classes.list}>
                            {friends.map(item => {return(
                                <ListItem
                                    button
                                    key={item}
                                    onClick={() => {setFriendSelected(item);setFriends([]);}}
                                >
                                    <ListItemText primary={item} />
                                </ListItem>
                            )})}
                        </List>
                    }   
                </Paper>
            </div>
        </div>
    );
};

export default HomePage;