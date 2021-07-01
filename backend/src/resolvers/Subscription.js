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
    subscribe(parent, { clubname }, { db, pubsub }, info) {
      const club = db.ClubModel.findOne({name: clubname});

      if(Object.keys(club).length === 0) throw new Error(`Club: ${clubname} does not exit`);

      return pubsub.asyncIterator(`Club ${clubname}`);
    }
  },
  ClubInHomePage: {
    subscribe(parent, args, { db, pubsub }, info) {
      
      return pubsub.asyncIterator(`ClubInHomePage`);
    }
  },
  Post: {
    subscribe(parent, { postId }, { db, pubsub }, info) {
      const post = db.PostModel.findById(postId);

      if(Object.keys(post).length === 0) throw new Error(`Club: ${postId} does not exit`);

      return pubsub.asyncIterator(`Post ${postId}`);
    }
  },
  User: {
    subscribe(parent, args, { db, pubsub }, info) {
      
      return pubsub.asyncIterator(`Update User`);
    }
  },
};

export { Subscription as default };
