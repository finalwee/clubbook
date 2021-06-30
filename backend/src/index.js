import { GraphQLServer, PubSub } from 'graphql-yoga';
import db from './db';
import Query from './resolvers/Query';
import Mutation from './resolvers/Mutation';
import Subscription from './resolvers/Subscription';
import ChatBox from './resolvers/ChatBox';
import Message from './resolvers/Message';
import Comment from './resolvers/Comment';
import Club from './resolvers/Club';
import Post from './resolvers/Post';
import User from './resolvers/User';
import mongo from './mongo';

const pubsub = new PubSub();

const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers: {
    Query,
    Mutation,
    Subscription,
    ChatBox,
    Message,
    Club,
    Comment,
    User, 
    Post
  },
  context: {
    db,
    pubsub,
  },
});

require('dotenv-defaults').config();

mongo.connect();

server.start({ port: process.env.PORT | 5000 }, () => {
  console.log(`The server is up on port ${process.env.PORT | 5000}!`);
});
