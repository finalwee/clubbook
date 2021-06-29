import { createContext, useContext, useState } from 'react';

const Flag = createContext({
  showChatRoom: false,
  postOriginal: false,
  setShowChatRoom: ()=>{},
  setPostOriginal: ()=>{},
});


const FlagProvider = (props) => {

    const [showChatRoom, setShowChatRoom] = useState(false);
    const [postOriginal, setPostOriginal] = useState(false);

  return (
    <Flag.Provider
      value={{
        showChatRoom,
        postOriginal,
        setShowChatRoom,
        setPostOriginal
      }}
      {...props}
    />
  );

};

function useFlag() {
  return useContext(Flag);
}

export { FlagProvider, useFlag };
