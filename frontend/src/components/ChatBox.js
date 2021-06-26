import { useEffect} from "react";  
import {Tag} from "antd";
import { makeStyles } from '@material-ui/core/styles';
import {useQuery} from '@apollo/react-hooks';
import {Query_CHATBOX_Messages} from "../graphql/Query";
import {MESSAGES_SUBSCRIPTION} from "../graphql/Subscription";

const useStyles = makeStyles(() => ({
    AppMessageLeft: {
      textAlign: 'left'
    },
  
    AppMessageRight: {
      textAlign: 'right'
    },
  
    selfDefinedTag: {
      fontSize: 12,
      display: 'inline-block',
      height: 'auto',
      marginLeft: 8,
      paddingLeft: 7,
      paddingRight: 7,
      whiteSpace: 'nowrap',
      border: 1,
      borderStyle: 'solid',
      borderRadius: 2,
      opacity: 1,
      color: '#096dd9',
      background: '#e6f7ff',
      borderColor: '#91d5ff'
  }
  }));

const ChatBox = ({me, friend, index}) => {
        
    const {data, subscribeToMore} = useQuery(Query_CHATBOX_Messages, {variables: {name1: me, name2: friend}});
    const classes = useStyles();

    useEffect(() => {
        let ChatBoxName = makeName(me, friend);
        subscribeToMore({
            document: MESSAGES_SUBSCRIPTION,
            variables: { ChatBoxName: ChatBoxName},
            updateQuery: (prev, {subscriptionData}) => {
                if(!subscriptionData.data) return prev;
                const newMessage = subscriptionData.data.ChatBox.data;

                console.log(newMessage);
                return({messages: newMessage})
            }
        })
    }, [subscribeToMore]);

    return(
        data === undefined ? <></> :
        <>
            {data?.messages?.map((message, idx) => 
            message.sender.name === friend ?
            <p key={index} className={classes.AppMessageLeft}>
                <Tag color="blue">{friend}</Tag>{message.body}
            </p> :
            <p key={index} className={classes.AppMessageRight}>
                {message.body}<span className={classes.selfDefinedTag}>{me}</span>
            </p>)}
        </>
    );
    
}

const makeName = (name, to) => {
    return [name, to].sort().join('_');
};

export default ChatBox;