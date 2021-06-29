import { useCallback ,useState } from "react";
import { Tabs, Input, } from "antd";
import { IconButton } from "@material-ui/core";
import CloseIcon from '@material-ui/icons/Close';
import { makeStyles } from '@material-ui/core/styles';
import styled from "styled-components";
import {useMutation} from '@apollo/react-hooks';
import ChatBox from "../components/ChatBox";
import { useFlag } from "../hooks/useFlag";
import {CREATE_MESSAGE_MUTATION} from "../graphql/Mutation";

const { TabPane } = Tabs;

const useStyles = makeStyles(() => ({
  AppMessages: {
    width: '100%',
    height: 300,
    background: '#fff',
    borderRadius: 5,
    overflow: 'auto'
  },

  AppTitle: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#68a7eb'
  },
  
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
    padding: '0 7',
    lineHeight: 20,
    whiteSpace: 'nowrap',
    border: '1 solid #d9d9d9',
    borderRadius: 2,
    opacity: 1,
    color: '#096dd9',
    background: '#e6f7ff',
    borderColor: '#91d5ff'
}
}));

const Styledh1 = styled.h1`
  margin: 0;
  margin-left: 60px; 
  padding-top: 12px;
  padding-bottom: 12px;
  width: auto;
  font-size: 2em;
  color: #fff;
`;

const StyledIconButton = styled(IconButton)`
  border: none;
  padding: 0;
  margin-left: 50px;
`;

const ChatRoom = ({ me, displayStatus, chatBoxes, removeChatBox}) => {  
  
  const [messageInput, setMessageInput] = useState("");
  const [activeKey, setActiveKey] = useState("");
  const {setShowChatRoom} = useFlag();
  const [createDbMessage] = useMutation(CREATE_MESSAGE_MUTATION);
  const classes = useStyles();

  const sendMessage = useCallback(async ({sender, chatboxname, message}) => {

    await createDbMessage({
        variables: {
        sender: sender,
        chatboxname: chatboxname,
        body: message
        },
    });
      
  },[createDbMessage]   
  )

  return (
    <>      
      <div className={classes.AppMessages}>
        <div className={classes.AppTitle}>
          <Styledh1>
            Chat Room
            <StyledIconButton onClick={()=>setShowChatRoom(false)}
            >
              <CloseIcon/>
            </StyledIconButton>
          </Styledh1> 
        </div>
        <Tabs type="editable-card" 
          activeKey={activeKey}
          hideAdd={true}
          onChange={(key) => { setActiveKey(key); }}
          onEdit={(targetKey, action) => {
            if (action === "remove") setActiveKey(removeChatBox(targetKey, activeKey, setShowChatRoom));
          }}
        >
          {chatBoxes.map((
            { friend, key }, i) => {
              return (
                <TabPane tab={friend} key={key} closable={true}>
                  <ChatBox me={me} friend={friend} index={i}/>
                </TabPane>
            );})}
         </Tabs>
      </div>
        <Input.Search
          value={messageInput}
          onChange={(e) => 
            setMessageInput(e.target.value)}
          enterButton="Send"
          placeholder=
            "Enter message here..."
            onSearch={(msg) => {
              if (!msg) {
                displayStatus({
                  type: "error",
                  msg: "Please enter message.",
                });
                return;
              } else if (activeKey === "") {
                displayStatus({
                  type: "error",
                  msg: "Please add a chatbox first.",
                });
                setMessageInput("");
                return;
              }
              sendMessage({sender: me, chatboxname: activeKey, message: msg });
              setMessageInput("");
            }}
    
        ></Input.Search> 
    </>);
  };
  export default ChatRoom;