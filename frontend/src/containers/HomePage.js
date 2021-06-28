import { useState, useEffect } from 'react';
import ChatRoom from './ChatRoom';
import Header from "./Header";
import HomePagePosts from './HomePagePosts';
import ClubPosts from './ClubPosts';
import useChatBox from '../hooks/useChatBox';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
    homepage: {
        display: 'flex',
        position: 'relative',
    },
    chatroom: props => ({
        visibility: props.visibility,
        position: 'absolute',
        left: 1100,
        bottom: -640,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: 350,
        margin: 'auto',
    })
}));

function HomePage({me, displayStatus}) {

    const { chatBoxes, removeChatBox, createChatBox } = useChatBox();
    const [clubSelected, setClubSelected] = useState('');
    const [show, setShow] = useState(false);
    const [recover, setRecover] = useState(true);
    let props = {visibility: (show ? 'visible' : 'hidden')};
    const classes = useStyles(props);
    
    return(
        <div className={classes.homepage}>
            {clubSelected === '' ? <HomePagePosts recover={recover} setRecover={setRecover}/> : 
                <ClubPosts clubname={clubSelected} me={me} recover={recover} setRecover={setRecover}/>}
            <Header me={me} displayStatus={displayStatus} createChatBox={createChatBox} 
                setClubSelected={setClubSelected} setShow={setShow} setRecover={setRecover}/>
            <div className={classes.chatroom}>
                <ChatRoom me={me} displayStatus={displayStatus} chatBoxes={chatBoxes} removeChatBox={removeChatBox} setShow={setShow}/>
            </div>
        </div>
    );
};

export default HomePage;