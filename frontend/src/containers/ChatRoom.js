import { useCallback ,useState } from "react";
import { message, Tabs, Input, Tag } from "antd";
import {useMutation} from '@apollo/react-hooks';
import ChatModal from "../components/ChatModal";
import ChatBox from "../components/ChatBox";
import useChatBox from "../hooks/useChatBox";
import {CREATE_MESSAGE_MUTATION} from "../graphql/Mutation";

const { TabPane } = Tabs;
const ChatRoom = ({ me, displayStatus }) => {  
  
  const [messageInput, setMessageInput] = useState("");
  const [activeKey, setActiveKey] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const { chatBoxes, removeChatBox, createChatBox } = useChatBox();
  const [createDbMessage] = useMutation(CREATE_MESSAGE_MUTATION);

  const addChatBox = () => { setModalVisible(true); };

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
      <div className="App-messages">
        <div className="App-title">
          <h1>{me}'s Chat Room</h1> 
        </div>
        <Tabs type="editable-card" 
          activeKey={activeKey}
          onChange={(key) => { setActiveKey(key); }}
          onEdit={(targetKey, action) => {
            if (action === "add") addChatBox();
            else if (action === "remove") setActiveKey(removeChatBox(targetKey, activeKey));
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
         <ChatModal
          visible={modalVisible}
          onCreate={({ name }) => {
            setActiveKey(createChatBox(name, me));
            setModalVisible(false);
          }}
          onCancel={() => {
            setModalVisible(false);
          }}
        />
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