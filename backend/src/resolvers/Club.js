const Club = {
  async posts(parent, args, {db}, info){
      return Promise.all(parent.posts.map(id => db.PostModel.findById(id)));
  },
};

export default Club;