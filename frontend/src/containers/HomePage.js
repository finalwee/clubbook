import { useState, useEffect } from 'react';
import ChatRoom from './ChatRoom';
import Header from "./Header";
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
    const [club_selected, setClubSelected] = useState('');
    const [show, setShow] = useState(false);
    let props = {visibility: (show ? 'visible' : 'hidden')};
    const classes = useStyles(props);
    
    return(
        <div className={classes.homepage}>
            <Header me={me} displayStatus={displayStatus} createChatBox={createChatBox} 
                setClubSelected={setClubSelected} setShow={setShow}/>
            <div className={classes.chatroom}>
                <ChatRoom me={me} displayStatus={displayStatus} chatBoxes={chatBoxes} removeChatBox={removeChatBox} setShow={setShow}/>
            </div>
        </div>
    );
};

export default HomePage;