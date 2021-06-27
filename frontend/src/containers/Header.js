import React from 'react';
import { useState } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import Paper  from '@material-ui/core/Paper';
import List from '@material-ui/core/List';
import ListItem  from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { fade, makeStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import SideBar from '../components/SideBar';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    title: {
        flexGrow: 1,
        [theme.breakpoints.up('sm')]: {
        display: 'block',
        position: 'absolute',
        left: 650,
        },
    },
    searchclub: {
        position: 'absolute',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
        backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        width: 233,
        left: 140,
        [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
        },
    },
    searchfriend: {
        position: 'absolute',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
        backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        width: 233,
        left: 1155,
        [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
        },
    },
    searchIcon: {
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputRoot: {
        color: 'inherit',
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
        width: '12ch',
        '&:focus': {
            width: '20ch',
        },
        },
    },
    clubsearchpaper: props =>({
        position: 'absolute',
        width: 233,
        left: 148,
        bottom: -211-props.clubcount,
    }),
    friendsearchpaper: props => ({
        position: 'absolute',
        width: 233,
        left: 1163,
        bottom: -215-props.friendcount,
    }),
    clublist: {
        maxWidth: 360,
        position: 'relative',
        overflow: 'auto',
        maxHeight: 250,
    },
    friendlist: {
        maxWidth: 360,
        position: 'relative',
        overflow: 'auto',
        maxHeight: 300,
    },
}));


function Header({me, displayStatus, createChatBox, setClubSelected, setShow}) {

    const [clubsearch, setClubSearch] = useState('');
    const [friendsearch, setFriendSearch] = useState('');
    const [clubs, setClubs] = useState(['Badminton', 'Tennis', 'Piano', 'Math', 'Web']);
    const [friends, setFriends] = useState(['Peter', 'Amy', 'Eric', 'Allen', 'Linda', 'Sherry']);
    const props = {clubcount: (4*clubs.length-18)*11+1 ,friendcount: (4*friends.length-18)*11+1};
    const classes = useStyles(props);

    return (
        <>
        <div className={classes.root}>
        <AppBar position="static">
            <Toolbar>
            <SideBar/>
            <div className={classes.searchclub}>
                <div className={classes.searchIcon}>
                <SearchIcon />
                </div>
                <InputBase
                placeholder="Search Club"
                onChange={evt => setClubSearch(() => {return evt.target.value;})}
                classes={{
                    root: classes.inputRoot,
                    input: classes.inputInput,
                }}
                inputProps={{ 'aria-label': 'search' }}
                />
            </div>
            <Typography className={classes.title} variant="h6" noWrap>
                &#x2663; Club Book &#x1F4DA;
            </Typography>
            <div className={classes.searchfriend}>
                <div className={classes.searchIcon}>
                <SearchIcon />
                </div>
                <InputBase
                placeholder="Search Friend"
                onChange={evt => setFriendSearch(() => {return evt.target.value;})}
                classes={{
                    root: classes.inputRoot,
                    input: classes.inputInput,
                }}
                inputProps={{ 'aria-label': 'search' }}
                />
            </div>
            </Toolbar>
        </AppBar>
        </div>
        <div className={classes.clubsearchpaper}>
            <Paper>
                {clubs.length===0 ? <></> :
                    <List className={classes.clublist}>
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
        <div className={classes.friendsearchpaper}>
            <Paper>
                {friends.length===0 ? <></> :
                    <List className={classes.friendlist}>
                        {friends.map(item => {return(
                            <ListItem
                                button
                                key={item}
                                onClick={() => {setFriends([]);setShow(true);createChatBox(item, me, displayStatus)}}
                            >
                                <ListItemText primary={item} />
                            </ListItem>
                        )})}
                    </List>
                }   
            </Paper>
        </div>
    </>
    );
}

export default Header;