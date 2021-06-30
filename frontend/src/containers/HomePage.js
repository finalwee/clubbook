import { useState, useEffect } from 'react';
import ChatRoom from './ChatRoom';
import Header from "./Header";
import HomePagePosts from './HomePagePosts';
import ClubPosts from './ClubPosts';
import PersonalProfile from '../components/PersonalProfile';
import useChatBox from '../hooks/useChatBox';
import { useFlag } from '../hooks/useFlag';
import { useCommonProps } from './ClubBook';
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

function HomePage() {

    const { chatBoxes, removeChatBox, createChatBox } = useChatBox();
    const [clubSelected, setClubSelected] = useState('');
    const { showChatRoom, showWhich } =useFlag();
    const {me, displayStatus} = useCommonProps();
    let props = {visibility: (showChatRoom ? 'visible' : 'hidden')};
    const classes = useStyles(props);
    let MainView = <></>;
    if(showWhich === 'club'){
        if (clubSelected === '')MainView = <HomePagePosts/>;
        else MainView = <ClubPosts clubname={clubSelected}/>;
    }else if(showWhich === 'personal profile'){
        MainView = <PersonalProfile/>;
    }
    
    return(
        <div className={classes.homepage}>
            {/* {clubSelected === '' ? <HomePagePosts/> : 
                <ClubPosts clubname={clubSelected}/>} */}
            {MainView}
            <Header createChatBox={createChatBox} setClubSelected={setClubSelected}/>
            <div className={classes.chatroom}>
                <ChatRoom chatBoxes={chatBoxes} removeChatBox={removeChatBox}/>
            </div>
        </div>
    );
};

export default HomePage;