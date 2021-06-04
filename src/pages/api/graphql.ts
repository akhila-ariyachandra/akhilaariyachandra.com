import Redis from "ioredis";
import schema from "@/graphql/schema";
import { context } from "@/graphql/context";
import { ApolloServer } from "apollo-server-micro";
import { BaseRedisCache } from "apollo-server-cache-redis";

const server = new ApolloServer({
  schema,
  context,
  cache: new BaseRedisCache({
    client: new Redis(process.env.REDIS_URL),
  }),
});

export const config = {
  api: {
    bodyParser: false,
  },
};

export default server.createHandler({
  path: "/api/graphql",
});
