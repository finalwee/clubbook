import { createContext, useContext, useState } from 'react';

const Flag = createContext({
  showChatRoom: false,
  postOriginal: false,
  showWhich: '',
  setShowChatRoom: ()=>{},
  setPostOriginal: ()=>{},
  setShowWhich: ()=>{},
});


const FlagProvider = (props) => {

    const [showChatRoom, setShowChatRoom] = useState(false);
    const [postOriginal, setPostOriginal] = useState(false);
    const [showWhich, setShowWhich] = useState('club');

  return (
    <Flag.Provider
      value={{
        showChatRoom,
        postOriginal,
        showWhich,
        setShowChatRoom,
        setPostOriginal,
        setShowWhich
      }}
      {...props}
    />
  );

};

function useFlag() {
  return useContext(Flag);
}

export { FlagProvider, useFlag };
