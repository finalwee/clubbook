const Comment = {
  async commenter(parent, args, { db }, info) {
    return await db.UserModel.findById(parent.commenter);
  },
};

export default Comment;