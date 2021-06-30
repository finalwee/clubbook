import React from 'react';
import { useState } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button  from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import Paper  from '@material-ui/core/Paper';
import List from '@material-ui/core/List';
import ListItem  from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { fade, makeStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import SideBar from '../components/SideBar';
import { useFlag } from '../hooks/useFlag';
import { useCommonProps } from './ClubBook';
import {useMutation} from '@apollo/react-hooks';
import {SEARCH_CLUB_MUTATION} from "../graphql/Mutation";
import {SEARCH_FRIENDS_MUTATION} from "../graphql/Mutation";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    title: {
        flexGrow: 1,
        [theme.breakpoints.up('sm')]: {
        display: 'block',
        position: 'absolute',
        left: 700,
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
        bottom: props.clubcount<=23 ? -211-props.clubcount : -211-23,
    }),
    friendsearchpaper: props => ({
        position: 'absolute',
        width: 233,
        left: 1163,
        bottom: props.friendcount<=67 ? -215-props.friendcount : -215-67,
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


function Header({createChatBox, setClubSelected}) {

    const [clubsearch, setClubSearch] = useState('');
    const [friendsearch, setFriendSearch] = useState('');
    const [clubs, setClubs] = useState([]);
    const [searchClub] = useMutation(SEARCH_CLUB_MUTATION);
    const [searchFriends] = useMutation(SEARCH_FRIENDS_MUTATION);
    const [friends, setFriends] = useState([]);
    const {setPostOriginal, setShowChatRoom, setShowWhich} = useFlag();
    const {me, displayStatus} = useCommonProps();
    const props = {clubcount: (4*clubs.length-18)*11+1 ,friendcount: (4*friends.length-18)*11+1};
    const classes = useStyles(props);

    const calname = (me) => {

        let name = '';
        let length = 0;
        let append = false;
        for(let i=0;i<me.length;i++){
            if(me[i].match(/^[0-9a-z]+$/) !== null){
                if((length+1) > 10){append = true; break;}
                else {name+=me[i];length+=1;}
            }else{
                if((length+2) > 10){append = true; break;}
                else {name+=me[i];length+=2;}
            }
        }
        if(append)return (name+'...');
        return name;
    }

    return (
        <>
        <div className={classes.root}>
        <AppBar position="static">
            <Toolbar>
            <SideBar setClubSelected={setClubSelected}/>
            <div className={classes.searchclub}>
                <div className={classes.searchIcon}>
                <SearchIcon />
                </div>
                <InputBase
                placeholder="Search Club"
                value={clubsearch}
                onChange={async evt => {
                        setClubSearch(evt.target.value);
                        let clubsSearched = await searchClub({
                            variables: {
                            keyword: evt.target.value,
                            },
                        });
                        let clubs=[];
                        if(clubsSearched.data.searchClub!==null){
                            clubs = clubsSearched.data.searchClub.map(club=>{
                                return club.name;   
                            })
                        }
                        setClubs(clubs);
                    }
                }
                onBlur={()=>{
                    // setClubSearch('');
                    // setClubs([]);
                }}
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
                value={friendsearch}
                onChange={async evt => {
                    setFriendSearch(evt.target.value);
                    let friendsSearched = await searchFriends({
                        variables: {
                        keyword: evt.target.value,
                        },
                    });
                    let friends=[];
                    if(friendsSearched.data.searchFriends!==null){
                        friends = friendsSearched.data.searchFriends.map(friend=>{
                            return friend.name;   
                        })
                    }
                    setFriends(friends);
                    }
                }
                onBlur={()=>{
                    // setFriendSearch('');
                    // setFriends([]);
                }}
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
                                onClick={() => {setClubSelected(item);setClubs([]);setPostOriginal(false);setShowWhich('club');}}
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
                                onClick={() => {setFriends([]);setShowChatRoom(true);createChatBox(item, me, displayStatus)}}
                            >
                                <ListItemText primary={item} />
                            </ListItem>
                        )})}
                    </List>
                }   
            </Paper>
        </div> 
        <Button variant="outlined" 
            style={{position: 'absolute', paddingLeft: 5, paddingRight: 5, paddingTop: 0, paddingBottom:0, 
                    backgroundColor: '#FFF', borderRadius: 30,  width: 'auto', left: 1410, top: 20, textTransform: 'none'}}
                    onClick={()=>setShowWhich('personal profile')}>
            {calname(me)}
        </Button>
    </>
    );
}

export default Header;