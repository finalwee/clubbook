const Post = {
  async comments(parent, args, { db }, info) {
    return Promise.all(parent.comments.map(id => db.CommentModel.findById(id)));
  },
};

export default Post;