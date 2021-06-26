import { useState } from 'react';
import {
    Paper,
    List,
    ListItem,
    ListItemText,
} from '@material-ui/core';
import SearchBar from "material-ui-search-bar";
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
    list: {
      maxWidth: 360,
      position: 'relative',
      overflow: 'auto',
      maxHeight: 230,
    },
  }));

function Search({type, me, displayStatus, createChatBox}){

    const [clubsearch, setClubSearch] = useState('');
    const [friendsearch, setFriendSearch] = useState('');
    const [clubs, setClubs] = useState(['Badminton', 'Tennis', 'Piano', 'Math', 'Web']);
    const [friends, setFriends] = useState(['Peter', 'Amy', 'Eric', 'Allen', 'Linda', 'Sherry']);
    const [club_selected, setClubSelected] = useState('');
    const [friend_selected, setFriendSelected] = useState('');
    const classes = useStyles();
    

    return(
        type === 'Club' ? 
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
        :
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
                                onClick={() => {setFriendSelected(item);setFriends([]);createChatBox(item, me, displayStatus)}}
                            >
                                <ListItemText primary={item} />
                            </ListItem>
                        )})}
                    </List>
                }   
            </Paper>
    );
}

export default Search;