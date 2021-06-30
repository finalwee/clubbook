const Post = {
  async comments(parent, args, { db }, info) {
    console.log(Promise.all(parent.comments.map(id => db.CommentModel.findById(id))))
    return Promise.all(parent.comments.map(id => db.CommentModel.findById(id)));
  },
};

export default Post;