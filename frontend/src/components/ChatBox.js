import { useEffect} from "react";  
import {Tag} from "antd";
import {useQuery} from '@apollo/react-hooks';
import {Query_CHATBOX_Messages} from "../graphql/Query";
import {MESSAGES_SUBSCRIPTION} from "../graphql/Subscription";

const ChatBox = ({me, friend, index}) => {
        
    const {data, subscribeToMore} = useQuery(Query_CHATBOX_Messages, {variables: {name1: me, name2: friend}});

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
            <p key={index} className="App-message-left">
                <Tag color="blue">{friend}</Tag>{message.body}
            </p> :
            <p key={index} className="App-message-right">
                {message.body}<span className="self-defined-tag">{me}</span>
            </p>)}
        </>
    );
    
}

const makeName = (name, to) => {
    return [name, to].sort().join('_');
};

export default ChatBox;