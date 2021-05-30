import schema from "@/graphql/schema";
import { context } from "@/graphql/context";
import { ApolloServer } from "apollo-server-micro";

const server = new ApolloServer({
  schema,
  context,
});

export const config = {
  api: {
    bodyParser: false,
  },
};

export default server.createHandler({
  path: "/api/graphql",
});
