import { GraphQLClient } from "graphql-request";
export { gql } from "graphql-request";

export const graphQLClient = new GraphQLClient("/api/graphql");
