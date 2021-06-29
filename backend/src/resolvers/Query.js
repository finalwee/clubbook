const makeName = (name, to) => {
  return [name, to].sort().join('_');
};

const Query = {
  async messages(parent, {name1, name2}, {db}, info) {
    let ChatBoxName = makeName(name1, name2);
    let chatbox = await db.ChatBoxModel.find({name: ChatBoxName});
    return Promise.all(chatbox[0].messages.map(id => db.MessageModel.findById(id)),);
  },
  async user(parent, {userId}, {db}, info){
    if( !userId ) throw new Error("Missing userId for Query user");

    return await db.UserModel.findById(userId);
  },
  async posts(parent, { clubName, username, begin, end}, {db}, info){
    let post = [];

    if(username) {
      let user = await db.UserModel.findOne({ name: username }).populate('subscribe');
      for(let i = 0; i < user.subscribe.length; i++) {
        await user.subscribe.populate('posts');
      }
    }
    console.log(user.subscribe);
    if(clubName) {
      let club = await db.ClubModel.find({ name: clubName,  }).populate('posts').populate('author');
    }
    
    //console.log(post)

    //return post;
  },
  async comments(parent, {postId}, {db}, info) {
    if( !postId ) throw new Error("Missing postId for Query comments");

    let post = await db.PostModel.findById(postId);

    let comment = [];

    for(let i = 0; i < post.comments.length; i++) {
      let find = await db.CommentModel.findById(post.comments[i]);
      let commenter = await db.UserModel.findById(find.commenter);

      comment.push({commenter: {name: commenter.name}, body: find.body, createTime: find.createtime})
    }

    return comment;

  }

};

export { Query as default };
