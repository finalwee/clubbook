const Comment = {
  async commenter(parent, args, {db}, info){
      return await db.CommentModel.findById(parent.commenter);       
  },
};

export default Comment;