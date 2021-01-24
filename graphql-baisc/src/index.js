import { GraphQLServer, PubSub } from "graphql-yoga";
import db from "./db";

import Query from "./resolver/Query";
import Mutation from "./resolver/Mutation";
import User from "./resolver/User";
import Post from "./resolver/Post";
import Comment from "./resolver/Comment";
import Subscription from "./resolver/Subscription";

const pubsub = new PubSub();

const server = new GraphQLServer({
  typeDefs: "./src/schema.graphql",
  resolvers: {
    Query,
    Mutation,
    Subscription,
    Post,
    User,
    Comment,
  },
  context: {
    db,
    pubsub,
  },
});

server.start(() => {
  console.log("The Server is up");
});
