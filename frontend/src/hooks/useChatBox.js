import { useState } from "react"; 
import { useMutation } from '@apollo/react-hooks';
import {CREATE_CHATBOX_MUTATION} from "../graphql/Mutation";


const useChatBox = () => {
  const [chatBoxes, setChatBoxes] = useState([]);

  const [createDbChatBox] = useMutation(CREATE_CHATBOX_MUTATION);

  const createChatBox = async (friend, me, displayStatus) => {
    const newKey = me <= friend ?
          `${me}_${friend}` : `${friend}_${me}`;
    try{
      if (chatBoxes.some(({ key }) => key === newKey)) {
        throw new Error(friend + "'s chat box has already opened.");
      }
    }catch(e){
      return displayStatus({
        type: "error",
        msg: friend + "'s chat box has already been opened.",
      })
    }
    const newChatBoxes = [...chatBoxes];
    await createDbChatBox({
      variables: {
        name1: me,
        name2: friend,
      },
    });
  
    newChatBoxes.push({ friend: friend, key: newKey});
    setChatBoxes(newChatBoxes);
    return newKey;
  };

  const removeChatBox = (targetKey, activeKey, setShowChatRoom) => {
    let newActiveKey = activeKey;
    let lastIndex;
    chatBoxes.forEach(({ key }, i) => {
      if (key === targetKey) { lastIndex = i - 1; }});
    const newChatBoxes = chatBoxes.filter(
      (chatBox) => chatBox.key !== targetKey);
    if (newChatBoxes.length) {
      if (newActiveKey === targetKey) {
        if (lastIndex >= 0) {
          newActiveKey = newChatBoxes[lastIndex].key;
        } else { newActiveKey = newChatBoxes[0].key; }
      }
    } else newActiveKey = ""; // No chatBox left
    setChatBoxes(newChatBoxes);
    if(newChatBoxes.length===0)setShowChatRoom(false);
    return newActiveKey;
  };
  return { createChatBox, removeChatBox, chatBoxes };
};
export default useChatBox;