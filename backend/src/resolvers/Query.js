const Query = {
  async messages(parent, {name1, name2}, {db}, info) {
    let ChatBoxName = makeName(name1, name2);
    let chatbox = await db.ChatBoxModel.find({name: ChatBoxName});
    let messages = [];
      for(let i=0; i<Object.keys(chatbox[0].messages).length;i++){
        messages.push(await db.MessageModel.findById(chatbox[0].messages[i]));
      }
      return messages;
  },
};

const makeName = (name, to) => {
  return [name, to].sort().join('_');
};

export { Query as default };
