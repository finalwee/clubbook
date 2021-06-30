const User = {
    async friends(parent, args, {db}, info){
        return Promise.all(parent.friends.map(id => db.UserModel.findById(id)));
    },
    async subscribe(parent, args, {db}, info){
        return Promise.all(parent.subscribe.map(id => db.ClubModel.findById(id)));
    }
  };
  
  export default User;