const makeName = (name, to) => {
  return [name, to].sort().join('_');
};

const Query = {
  async messages(parent, { name1, name2 }, { db }, info) {
    let ChatBoxName = makeName(name1, name2);
    let chatbox = await db.ChatBoxModel.find({ name: ChatBoxName });
    return Promise.all(chatbox[0].messages.map(id => db.MessageModel.findById(id)),);
  },
  async user(parent, { username }, { db }, info) {
    if (!username) throw new Error("Missing userId for Query user");

    return await db.UserModel.findOne(({ name: username }));
  },
  async posts(parent, { clubName, username, begin, end }, { db }, info) {
    if (clubName && username) throw new Error("Choose only clubname or username");
    let post = [];

    if (username) {
      let user = await db.UserModel.findOne({ name: username }).populate('subscribe');

      for (let i = 0; i < user.subscribe.length; i++) {
        for (let j = 0; j < user.subscribe[i].posts.length; j++) {
          post.push(await db.PostModel.findById(user.subscribe[i].posts[j]))
        }
      }
    }
    if (clubName) {
      let club = await db.ClubModel.findOne({ name: clubName }).populate('posts').populate('author');
      post = club.posts;
    }
    for (let i = 0; i < post.length; i++) {
      post[i].author = await db.UserModel.findById(post[i].author);
    }

    post = post.sort((a, b) => b.createTime - a.createTime);

    if (begin > post.length) { return []; }
    else if (end >= post.length) { return post.slice(begin - 1, post.length); }
    else return post.slice(begin - 1, end);
  },
  async comments(parent, { postId }, { db }, info) {
    if (!postId) throw new Error("Missing postId for Query comments");

    let post = await db.PostModel.findById(postId);

    let comment = [];

    for (let i = 0; i < post.comments.length; i++) {
      let find = await db.CommentModel.findById(post.comments[i]);
      let commenter = await db.UserModel.findById(find.commenter);

      comment.push({ commenter: { name: commenter.name }, body: find.body, createTime: find.createtime })
    }

    return comment;

  }

};

export { Query as default };
