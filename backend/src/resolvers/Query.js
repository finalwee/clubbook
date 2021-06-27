const makeName = (name, to) => {
  return [name, to].sort().join('_');
};

const Query = {
  async messages(parent, {name1, name2}, {db}, info) {
    let ChatBoxName = makeName(name1, name2);
    let chatbox = await db.ChatBoxModel.find({name: ChatBoxName});
    return Promise.all(chatbox[0].messages.map(id => db.MessageModel.findById(id)),);
  },
  async posts(parent, {clubId}, {db}, info){
    if( !clubId ) throw new Error("Missing clubId for Query posts");

    let club = await db.ClubModel.findById(clubId);
    console.log(club.posts)

    let post = [];

    for(let i = 0; i < club.posts.length; i++) {
      let find = await db.PostModel.findById(club.posts[i]);
      let author = await db.UserModel.findById(find.author);
      post.push({author: author, body: find.body, createTime: find.createtime});
    }

    return post;
  },
  async comments(parent, {postId}, {db}, info) {
    if( !postId ) throw new Error("Missing postId! for Query comments");

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
