import { join } from "path";
import { makeSchema } from "nexus";
import * as types from "@/graphql/types";

const schema = makeSchema({
  types,
  outputs: {
    typegen: join(process.cwd(), "generated/nexus-typegen.ts"),
    schema: join(process.cwd(), "generated/schema.graphql"),
  },
  contextType: {
    module: join(process.cwd(), "src/graphql/context.ts"),
    export: "Context",
  },
});

export default schema;
