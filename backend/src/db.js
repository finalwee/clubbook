import mongoose from 'mongoose';

const { Schema } = mongoose;

const userSchema = new Schema({
  name: { type: String, required: true },
  password: { type: String, required: true },
  email: { type: String, required: false },
  friends: [{ type: mongoose.Types.ObjectId, ref: 'User' }],
  subscribe: [{ type: mongoose.Types.ObjectId, ref: 'Club'}],
  favourite: { type: String, required: false}
});

const messageSchema = new Schema({
  sender: { type: mongoose.Types.ObjectId, ref: 'User' },
  body: { type: String, required: true },
});

const chatBoxSchema = new Schema({
  name: { type: String, required: true },
  messages: [{ type: mongoose.Types.ObjectId, ref: 'Message' }],
});

const commentSchema = new Schema({
  commenter: { type: mongoose.Types.ObjectId, ref: 'User' },
  createtime: { type: Date, default: Date.now },
  body:[{ type: String, required: true }]
});

const postSchema = new Schema({
  author: { type: mongoose.Types.ObjectId, ref: 'User' },
  createtime: { type: Date, default: Date.now },
  body: { type: String, required: true },
  comments: [{ type: mongoose.Types.ObjectId, ref: 'Comment' }]
});

const clubSchema = new Schema({
  author: { type: mongoose.Types.ObjectId, ref: 'User' },
  name: { type: String, required: true },
  createtime: { type: Date, default: Date.now },
  posts: [{ type: mongoose.Types.ObjectId, ref: 'Post'}],
  keywords: [{ type: String, required: true}]
});

const UserModel = mongoose.model('User', userSchema);
const ChatBoxModel = mongoose.model('ChatBox', chatBoxSchema);
const MessageModel = mongoose.model('Message', messageSchema);
const CommentModel = mongoose.model('Comment', commentSchema);
const PostModel = mongoose.model('Post', postSchema);
const ClubModel = mongoose.model('Club', clubSchema);

const db = {
  UserModel,
  ChatBoxModel,
  MessageModel,
  CommentModel,
  PostModel,
  ClubModel,
};

export {db as default};