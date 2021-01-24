import { GraphQLServer, PubSub } from "graphql-yoga";
import db from "./db";
import { resolvers, fragmentReplacements } from "./resolver/index";

import prisma from "./prisma";

const pubsub = new PubSub();

const server = new GraphQLServer({
  typeDefs: "./src/schema.graphql",
  resolvers: resolvers,
  context(req) {
    return {
      db,
      pubsub,
      prisma,
      req,
    };
  },
  fragmentReplacements,
});

server.start(() => {
  console.log("The Server is up");
});
