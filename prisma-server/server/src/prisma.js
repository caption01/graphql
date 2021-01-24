import { Prisma } from "prisma-binding";
import { fragmentReplacements } from "./resolver/index";

const prisma = new Prisma({
  typeDefs: "src/generated/prisma.graphql",
  endpoint: "http://localhost:4466",
  secret: "superroot",
  fragmentReplacements,
});

export { prisma as default };
