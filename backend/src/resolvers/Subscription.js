const Subscription = {
  ChatBox: {
    subscribe(parent, { ChatBoxName }, { db, pubsub }, info) {
      const chatbox = db.ChatBoxModel.find({name: ChatBoxName});

      if (Object.keys(chatbox).length===0) {
        throw new Error(`ChatBox: ${ChatBoxName} does not exit`);
      }

      return pubsub.asyncIterator(`ChatBox ${ChatBoxName}`);
    },
  },
};

export { Subscription as default };
