const ChatBox = {
    async messages(parent, args, {db}, info){
        return Promise.all(parent.messages.map(id => db.MessageModel.findById(id)),);
    },
};

export default ChatBox;