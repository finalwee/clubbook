import uuidv4 from 'uuid/v4';
import bcrypt from 'bcrypt';

const Mutation = {
  async createUser(parent, args, {db, pubsub}, info){
    if(!args.name || !args.password)throw new Error("Missing name or password for CreateUser");

    let existing = await db.UserModel.findOne({ name: args.name });
    if(existing) throw new Error("User name existed");

    let newUser = new db.UserModel(args)
    const salt = await bcrypt.genSalt(10);
    if (/\s/g.test(args.password)) {
       throw new Error("Invalid password");
    }
    newUser.password = await bcrypt.hash(newUser.password, salt);

    await newUser.save(err => {
      if(err) {
        throw err;
      }
    });

    return newUser._id;
  },
  async userLogin(parent, {name, password}, {db, pubsub}, info) {
    if(!name || !password)throw new Error("Missing name or password for User Login");

    let user = await db.UserModel.findOne({ name });
    if(user) {
      const validPassword = await bcrypt.compare(password, user.password);

      if(validPassword) {
        return true;
      }
      else {
        return false;
      }
    }
  },
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
    result.push(Message[Message.length-1]);

    pubsub.publish(`ChatBox ${chatboxname}`, {
      ChatBox: {
        mutation: 'UPDATED',
        data: result,
      },
    });

    return result;
  },
  async createClub(parent, { name, author }, { db, pubsub }, info) {
    if(!name || !author) throw new Error("Missing input for create club");
    let user = await db.UserModel.findOne({ name: author });
    
    if(!user) {
      throw new Error("Author do not exist");
    }

    let existing = await db.ClubModel.findOne({name});

    if(!existing) {
      await db.ClubModel.create({author: user, name: name, createTime: Date.now()});
      return true;
    }
    else {
      throw new Error("Club existed");
    }

  },
  async createPost(parent, { author, body, clubName }, { db, pubsub }, info) {
    if(!author || !body || !clubName) throw new Error("Missing input for create post");
    let user = await db.UserModel.findOne({ name: author });
    
    if(!user) {
      throw new Error("Author do not exist");
    }

    let club = await db.ClubModel.findOne({name: clubName});

    if(!club) {
      throw new Error("Club do not exist");
    }

    let newPost = new db.PostModel({author: user, body, createTime: Date.now()});
    await newPost.save();

    club.posts.push(newPost);
    await club.save();

    let subscripPost = [];

    for(let i = 0; i < club.posts.length; i++) {
      let find = await db.PostModel.findById(club.posts[i]);
      let author = await db.UserModel.findById(find.author);

      subscripPost.push({author: author, body: find.body, createTime: find.createtime});
    }

    pubsub.publish(`Club ${club._id}`, {
      Club: {
        mutation: 'UPDATED',
        data: subscripPost,
      },
    });

    return true;
  },
  async createComment(parent, { commenter, body, postId }, { db, pubsub }, info){
    if(!commenter || !body || !postId) throw new Error("Missing input for create post");
    let user = await db.UserModel.findOne({ name: commenter });
    
    if(!user) {
      throw new Error("Commenter do not exist");
    }

    let post = await db.PostModel.findById(postId);

    if(!post) {
      throw new Error("Post do not exist");
    }

    let newComment = new db.CommentModel({commenter: user, body, createTime: Date.now()});
    await newComment.save();

    post.comments.push(newComment);
    await post.save();

    let subscripComment = [];

    for(let i = 0; i < post.comments.length; i++) {
      let find = await db.CommentModel.findById(post.comments[i]);
      let commenter = await db.UserModel.findById(find.commenter);

      subscripComment.push({commenter: commenter, body: find.body, createTime: find.createtime});
    }

    console.log(subscripComment)

    pubsub.publish(`Post ${post._id}`, {
      Post: {
        mutation: 'UPDATED',
        data: subscripComment,
      },
    });

    return true;

  },
};

const makeName = (name, to) => {
  return [name, to].sort().join('_');
};


export { Mutation as default };
