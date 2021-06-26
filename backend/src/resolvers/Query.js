const Query = {

  async messages(parent, {name1, name2}, {db}, info) {
    let ChatBoxName = makeName(name1, name2);
    let chatbox = await db.ChatBoxModel.find({name: ChatBoxName});
    return Promise.all(chatbox[0].messages.map(id => db.MessageModel.findById(id)),);
  },
  
};

const makeName = (name, to) => {
  return [name, to].sort().join('_');
};

export { Query as default };
