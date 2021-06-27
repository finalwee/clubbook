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
  Club: {
    subscribe(parent, { clubId }, { db, pubsub }, info) {
      const club = db.ClubModel.findById(clubId);

      if(Object.keys(club).length === 0) throw new Error(`Club: ${clubId} does not exit`);

      return pubsub.asyncIterator(`Club ${clubId}`);
    }
  },
  Post: {
    subscribe(parent, { postId }, { db, pubsub }, info) {
      const post = db.PostModel.findById(postId);

      if(Object.keys(post).length === 0) throw new Error(`Club: ${postId} does not exit`);

      return pubsub.asyncIterator(`Post ${postId}`);
    }
  }
};

export { Subscription as default };
