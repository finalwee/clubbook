const ChatBox = {
    async messages(parent, args, {db}, info){
        let result = [];
        for(let i=0; i<Object.keys(parent.messages).length;i++){
            result.push(await db.MessageModel.findById(parent.messages[i]));
        }
        return result;
    },
};

export default ChatBox;