import uuidv4 from 'uuid/v4';

const Mutation = {
  
  async createChatBox(parent, {name1, name2}, {db, pubsub}, info){
    if (!name1 || !name2)throw new Error("Missing chatbox name for CreateChatBox");
    let existing = await db.UserModel.find({name: name1});
    if (Object.keys(existing).length===0){
      console.log("User does not exist for CreateChatBox: " + name1);
      await db.UserModel.create({name: name1});
    }
    existing = await db.UserModel.find({name: name2});
    if (Object.keys(existing).length===0){
      console.log("User does not exist for CreateChatBox: " + name2);
      await db.UserModel.create({name: name2});
    }
    let ChatBoxName = makeName(name1, name2);
    existing = await db.ChatBoxModel.find({name: ChatBoxName});
    if (Object.keys(existing).length===0){
      console.log("ChatBox: " + ChatBoxName + " does not exist");
      await db.ChatBoxModel.create({name: ChatBoxName});
    }
    
  },
async createMessage(parent, {sender, chatboxname, body}, { db, pubsub }, info) {

  let User = await db.UserModel.find({name: sender});
  let message = {
    sender: User[0]._id,
    body: body,
  };
  
  await db.MessageModel.create(message);
  let Message = await db.MessageModel.find(message);

  let existing = await db.ChatBoxModel.find({name: chatboxname});
  
  let messages;
  if(Object.keys(existing).length===0){
    throw new Error(`ChatBox: ${ChatBoxName} does not exist`);
  }else if(Object.keys(existing).length!==1){
    throw new Error(`There are more than one ChatBox: ${chatboxname}`);
  }else{
    messages = existing[0].messages;
    messages.push(Message[Message.length-1]._id);
    await db.ChatBoxModel.updateOne({name: chatboxname}, {$set: {"messages": messages}});
  }

  let result = [];
  for(let i=0; i<Object.keys(messages).length;i++){
    result.push(await db.MessageModel.findById(messages[i]));
  }

  pubsub.publish(`ChatBox ${chatboxname}`, {
    ChatBox: {
      mutation: 'UPDATED',
      data: result,
    },
  });

  return result;
},
};

const makeName = (name, to) => {
  return [name, to].sort().join('_');
};


export { Mutation as default };
