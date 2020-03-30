---
title: Create a serverless API with TypeScript, GraphQL and MongoDB
date: "2019-11-20"
description: "Let's a quick GraphQL API and deploy it using Now"
banner: "./banner.png"
---

In this post we'll create a GraphQL API to create, view and delete notes that we can deploy to [Zeit](https://zeit.co/) using [Apollo Server](https://www.apollographql.com/docs/apollo-server/), TypeScript and MongoDB.

## Initial Setup

First the [Now CLI](https://zeit.co/download) will need be downloaded, installed and logged into.

```shell
yarn global add now
now login
```

The nice thing about using the **Now CLI** for development is that we don't have to worry about manually configuring TypeScript.

Then create a folder, initialize a project in it and install _typescript_ as a dev dependency.

```shell
mkdir serverless-graphql-api-example
cd serverless-graphql-api-example
yarn init --yes
yarn add typescript -D
```

## Setup the Database

To start setting up the database first go to [MongoDB Atlas](https://www.mongodb.com/), create a database and get the connection URI.

> If you want a more detailed explanation check out my [previous guide here](https://akhilaariyachandra.com/setup-mongodb-in-nodejs-with-mongoose/). Note that you can't follow it exactly here because you can no longer create new accounts in MLab (use [MongoDB Atlas](https://www.mongodb.com/) instead) and that guide is for an always running server, not a serverless one.

Then install the _mongoose_ dependency. Since we'll be working with TypeScript we'll need the types for _mongoose_ as well.

```shell
yarn add mongoose
yarn add @types/mongoose -D
```

After let's create the model for the notes. Create a folder called _src_. After that create a folder called _database_ in _src_. Then in that create another folder called _models_ and in that create the file **note.ts**.

Start by importing _mongoose_.

```typescript
import mongoose from "mongoose";
```

Next create an interface for the model which extends from `mongoose.Document`. We'll need to export this interface for use later as well.

```typescript
export interface INote extends mongoose.Document {
  title: string;
  content: string;
  date: Date;
}
```

After that we'll create the schema definition.

```typescript
const schema: mongoose.SchemaDefinition = {
  title: { type: mongoose.SchemaTypes.String, required: true },
  content: { type: mongoose.SchemaTypes.String, required: true },
  date: { type: mongoose.SchemaTypes.Date, required: true },
};
```

Then define the name of the collection and the schema using schema definition.

```typescript
const collectionName: string = "note";
const noteSchema: mongoose.Schema = new mongoose.Schema(schema);
```

Since we're building a serverless API, we can't depend on a persistent connection to database. When creating a Model we need to create it using the database connection.

To compensate for using serverless we'll generate the Model at runtime using a function. After declaring the functions, make it the default export.

```typescript
const Note = (conn: mongoose.Connection): mongoose.Model<INote> =>
  conn.model(collectionName, noteSchema);

export default Note;
```

Finally the Note model file should look like this.

```typescript
// src/database/models/note.ts
import mongoose from "mongoose";

export interface INote extends mongoose.Document {
  title: string;
  content: string;
  date: Date;
}

const schema: mongoose.SchemaDefinition = {
  title: { type: mongoose.SchemaTypes.String, required: true },
  content: { type: mongoose.SchemaTypes.String, required: true },
  date: { type: mongoose.SchemaTypes.Date, required: true },
};

const collectionName: string = "note";
const noteSchema: mongoose.Schema = new mongoose.Schema(schema);

const Note = (conn: mongoose.Connection): mongoose.Model<INote> =>
  conn.model(collectionName, noteSchema);

export default Note;
```

After creating the Note Model, let's look into the database connection.

Since we're using serverless, we can't have a persistent connection to database for every invocation of the serverless function as this would create issues with scaling.

First create the **.env** file in the project root to store the MongoDB URI as _DB_PATH_.

> Never commit the **.env** file. Make sure to add it to **.gitignore**.

```
DB_PATH=mongodb://user:password@ds654321.mlab.com:12345/example-db
```

Next create the the **index.js** file in _src/database_ and import _mongoose_.

```typescript
import mongoose from "mongoose";
```

Then get the MongoDB URI that we included in the **.env** file. It can be accessed as a key in `process.env`.

```typescript
const uri: string = process.env.DB_PATH;
```

After that declare a variable that will be used to cache the database connection between function invocations to prevent overloading the database.

```typescript
let conn: mongoose.Connection = null;
```

Finally we need to create a function that will return a database connection. The function will first check if there is a cached connection. If there is one it will return it or else it will create a new connection and cache and return it. Be sure to export the function.

```typescript
export const getConnection = async (): Promise<mongoose.Connection> => {
  if (conn == null) {
    conn = await mongoose.createConnection(uri, {
      bufferCommands: false, // Disable mongoose buffering
      bufferMaxEntries: 0, // and MongoDB driver buffering
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
  }

  return conn;
};
```

Finally the file should look like this.

```typescript
// src/database/index.ts
import mongoose from "mongoose";

const uri: string = process.env.DB_PATH;

let conn: mongoose.Connection = null;

export const getConnection = async (): Promise<mongoose.Connection> => {
  if (conn == null) {
    conn = await mongoose.createConnection(uri, {
      bufferCommands: false, // Disable mongoose buffering
      bufferMaxEntries: 0, // and MongoDB driver buffering
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
  }

  return conn;
};
```

## Setup the GraphQL API

First let's install the dependencies.

```shell
yarn add apollo-server-micro dayjs graphql graphql-iso-date
```

Next create the folder _api_ and in it create the file **graphql.ts**. **Now** will expose the serverless function in the file as the endpoint **/api/graphql**. The GraphQL function will be created using [Apollo Server](https://www.apollographql.com/docs/apollo-server/). Since we're doing a serverless version we'll be using [apollo-server-micro](https://www.npmjs.com/package/apollo-server-micro).

Then import _ApolloServer_ from _apollo-server-micro_ and the function to create the database connection.

```typescript
import { ApolloServer } from "apollo-server-micro";
import { getConnection } from "../src/database";
```

After that import the GraphQL Schemas and Resolvers. We'll create these later.

```typescript
import typeDefs from "../src/graphql/schema";
import resolvers from "../src/graphql/resolvers";
```

Then initialize the apollo server and export it.

```typescript
const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
});

export default apolloServer.createHandler({ path: "/api/graphql" });
```

When creating a new _ApolloServer_, we can define the **context** option. The **context** option is an object which can be accessed by any of the resolvers.

This will be a good place to initialize the database connection and automatically pass it down to the resolvers.

```typescript
const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  context: async () => {
    const dbConn = await getConnection();

    return { dbConn };
  },
});
```

To finish the function code we'll set the _introspection_ and _playground_ options.

```typescript
const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  context: async () => {
    const dbConn = await getConnection();

    return { dbConn };
  },
  playground: true,
  introspection: true,
});
```

Finally the file should look like this.

```typescript
// api/graphql.ts
import { ApolloServer } from "apollo-server-micro";
import { getConnection } from "../src/database";

import typeDefs from "../src/graphql/schema";
import resolvers from "../src/graphql/resolvers";

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  context: async () => {
    const dbConn = await getConnection();

    return { dbConn };
  },
  playground: true,
  introspection: true,
});

export default apolloServer.createHandler({ path: "/api/graphql" });
```

## Setup the GraphQL Schema

In the _src_ folder create the _graphql_ folder and in that create the _schema_ folder.

GraphQL doesn't have a type for date and time so we'll need a schema for those types. Create _custom.ts_ in the _schema_ folder

```typescript
// src/graphql/schema/custom.ts
import { gql } from "apollo-server-micro";

export default gql`
  scalar Date
  scalar Time
  scalar DateTime
`;
```

Next we'll setup the schema for Note.

First create the Note schema file, _note.ts_ in the _schema_ folder.

```typescript
import { gql } from "apollo-server-micro";

export default gql``;
```

Then add the Note type.

```typescript
export default gql`
  type Note {
    _id: ID!
    title: String!
    content: String!
    date: DateTime!
  }
`;
```

After that add two Queries, one to get all Notes and one to get a specific Note.

```typescript
export default gql`
  extend type Query {
    getAllNotes: [Note!]
    getNote(_id: ID!): Note
  }

  type Note {
    _id: ID!
    title: String!
    content: String!
    date: DateTime!
  }
`;
```

Next add two Mutations to create new Notes and delete existing ones.

```typescript
export default gql`
  extend type Query {
    getAllNotes: [Note!]
    getNote(_id: ID!): Note
  }

  extend type Mutation {
    saveNote(title: String!, content: String!): Note!
    deleteNote(_id: ID!): Note
  }

  type Note {
    _id: ID!
    title: String!
    content: String!
    date: DateTime!
  }
`;
```

> Note that we add the keyword **extend** to the Query and Mutation type in the two schemas. This is because we'll be joining all the schemas into one later.

Finally we'll need a schema a join all the others schemas together. Create _index.ts_ in the _schema_ folder and declare and export the Link Schema in an array.

```typescript
import { gql } from "apollo-server-micro";

const linkSchema = gql`
  type Query {
    _: Boolean
  }

  type Mutation {
    _: Boolean
  }

  type Subscription {
    _: Boolean
  }
`;

export default [linkSchema];
```

Then import the other Schemas and add them to the array.

```typescript
// src/graphql/schema/index.ts
import { gql } from "apollo-server-micro";

import noteSchema from "./note";
import customSchema from "./custom";

const linkSchema = gql`
  type Query {
    _: Boolean
  }

  type Mutation {
    _: Boolean
  }

  type Subscription {
    _: Boolean
  }
`;

export default [linkSchema, noteSchema, customSchema];
```

## Setup the resolvers

Since we added a custom type for dates and times in our schema, the first resolver we'll add is for those types. Create a folder called _resolvers_ in the _graphql_ folder and in it create _custom.ts_.

```typescript
// src/graphql/resolvers/custom.ts
import { GraphQLDate, GraphQLTime, GraphQLDateTime } from "graphql-iso-date";

export default {
  Date: GraphQLDate,
  Time: GraphQLTime,
  DateTime: GraphQLDateTime,
};
```

Next we'll start working on the resolver for Notes.

Start by importing the required dependencies and exporting an empty object which is going to be our resolver.

```typescript
import mongoose from "mongoose";
import dayjs from "dayjs";
import NoteModel, { INote } from "../../database/models/note";
import { ApolloError } from "apollo-server-micro";

export default {};
```

Then define an object for the Queries.

```typescript
export default {
  Query: {},
};
```

When defining the function for each of the queries (or mutations or fields) there are three important parameters.

- **parent** - If you a resolving a field of an object this parameter will contain it. We won't be needing it in this post.
- **args** - The arguments passed to the query or mutation.
- **context** - The context object created when setting up the API. In our case it'll contain the database connection.

First let's write the resolver for **getAllNotes**. Start by declaring the function.

```typescript
export default {
  Query: {getAllNotes: async (
      parent,
      args,
      context
    ): Promise<INote[]> => {}
};
```

Let's destructure the _context_ object.

```typescript
export default {
  Query: {getAllNotes: async (
      parent,
      args,
      { dbConn }: { dbConn: mongoose.Connection }
    ): Promise<INote[]> => {}
};
```

In the function we should create the Note model using the database connection from the context and retrieve all the Notes using it.

```typescript
export default {
  Query: {
    getAllNotes: async (
      parent,
      args,
      { dbConn }: { dbConn: mongoose.Connection }
    ): Promise<INote[]> => {
      const Note: mongoose.Model<INote> = NoteModel(dbConn);

      let list: INote[];

      try {
        list = await Note.find().exec();
      } catch (error) {
        console.error("> getAllNotes error: ", error);

        throw new ApolloError("Error retrieving all notes");
      }

      return list;
    },
  },
};
```

After that let's add the resolver for **getNote**.

```typescript
export default {
  Query: {
    getAllNotes: async (
      parent,
      args,
      { dbConn }: { dbConn: mongoose.Connection }
    ): Promise<INote[]> => {
      const Note: mongoose.Model<INote> = NoteModel(dbConn);

      let list: INote[];

      try {
        list = await Note.find().exec();
      } catch (error) {
        console.error("> getAllNotes error: ", error);

        throw new ApolloError("Error retrieving all notes");
      }

      return list;
    },

    getNote: async (
      parent,
      { _id }: { _id: INote["_id"] },
      { dbConn }: { dbConn: mongoose.Connection }
    ): Promise<INote> => {
      const Note: mongoose.Model<INote> = NoteModel(dbConn);

      try {
        const note = await Note.findById(_id).exec();

        return note;
      } catch (error) {
        console.error("> getNote error: ", error);

        throw new ApolloError("Error retrieving all notes");
      }
    },
  },
};
```

We can retrieve the _id_ argument from the second parameter.

Let's finish of the Note resolvers by adding the resolvers for the mutations.

```typescript
export default {
  // ..........
  Mutation: {
    saveNote: async (
      parent,
      { title, content }: { title: INote["title"]; content: INote["content"] },
      { dbConn }: { dbConn: mongoose.Connection }
    ): Promise<INote> => {
      const Note: mongoose.Model<INote> = NoteModel(dbConn);

      try {
        const note = await Note.create({
          title,
          content,
          date: dayjs().toDate(),
        });

        return note;
      } catch (error) {
        console.error("> saveNote error: ", error);

        throw new ApolloError("Error creating note");
      }
    },

    deleteNote: async (
      parent,
      { _id }: { _id: INote["_id"] },
      { dbConn }: { dbConn: mongoose.Connection }
    ): Promise<INote> => {
      const Note: mongoose.Model<INote> = NoteModel(dbConn);

      try {
        const note = await Note.findByIdAndDelete(_id).exec();

        return note;
      } catch (error) {
        console.error("> getNote error: ", error);

        throw new ApolloError("Error retrieving all notes");
      }
    },
  },
};
```

Finally the file should look like this.

```typescript
// src/graphql/resolvers/note.ts
import mongoose from "mongoose";
import dayjs from "dayjs";
import NoteModel, { INote } from "../../database/models/note";
import { ApolloError } from "apollo-server-micro";

export default {
  Query: {
    getAllNotes: async (
      parent,
      args,
      { dbConn }: { dbConn: mongoose.Connection }
    ): Promise<INote[]> => {
      const Note: mongoose.Model<INote> = NoteModel(dbConn);

      let list: INote[];

      try {
        list = await Note.find().exec();
      } catch (error) {
        console.error("> getAllNotes error: ", error);

        throw new ApolloError("Error retrieving all notes");
      }

      return list;
    },

    getNote: async (
      parent,
      { _id }: { _id: INote["_id"] },
      { dbConn }: { dbConn: mongoose.Connection }
    ): Promise<INote> => {
      const Note: mongoose.Model<INote> = NoteModel(dbConn);

      try {
        const note = await Note.findById(_id).exec();

        return note;
      } catch (error) {
        console.error("> getNote error: ", error);

        throw new ApolloError("Error retrieving all notes");
      }
    },
  },

  Mutation: {
    saveNote: async (
      parent,
      { title, content }: { title: INote["title"]; content: INote["content"] },
      { dbConn }: { dbConn: mongoose.Connection }
    ): Promise<INote> => {
      const Note: mongoose.Model<INote> = NoteModel(dbConn);

      try {
        const note = await Note.create({
          title,
          content,
          date: dayjs().toDate(),
        });

        return note;
      } catch (error) {
        console.error("> saveNote error: ", error);

        throw new ApolloError("Error creating note");
      }
    },

    deleteNote: async (
      parent,
      { _id }: { _id: INote["_id"] },
      { dbConn }: { dbConn: mongoose.Connection }
    ): Promise<INote> => {
      const Note: mongoose.Model<INote> = NoteModel(dbConn);

      try {
        const note = await Note.findByIdAndDelete(_id).exec();

        return note;
      } catch (error) {
        console.error("> getNote error: ", error);

        throw new ApolloError("Error retrieving all notes");
      }
    },
  },
};
```

Now we have to connect all the resolvers together using an _index.ts_ file created in the _resolvers_ folder.

```typescript
// src/graphql/resolvers/index.ts
import noteResolver from "./note";
import customResolver from "./custom";

export default [noteResolver, customResolver];
```

## Running the API locally

Just run _now_ locally.

```shell
now dev
```

If you visit **http://localhost:3000/api/graphql** you can see the GraphQL Playground.

## Deploying to Now

First we need to upload the database path as a secret. We upload it as **serverless-graphql-api-example-dp-path**.

```shell
now secrets add serverless-graphql-api-example-dp-path "DB_PATH=mongodb://user:password@ds654321.mlab.com:12345/example-db"
```

Then create the [now configuration file](https://zeit.co/docs/configuration/), _now.json_ in the project root.

```json
{
  "version": 2,
  "name": "serverless-graphql-api-example",
  "env": {
    "DB_PATH": "@serverless-graphql-api-example-dp-path"
  }
}
```

In the configuration file, we specifying to expose the secret _serverless-graphql-api-example-dp-path_ as environment variable _DB_PATH_.

All that's let to do is deploying to now.

```shell
now
```

The GraphQL Playground should be visible in the _/api/graphql_ route of the URL returned.

## Wrapping Up

I made a sample deployment which you can check out [here](https://serverless-graphql-api-example-five-gamma.now.sh/api/graphql). The source code is available on [GitHub](https://github.com/akhila-ariyachandra/serverless-graphql-api-example).

If you want a more detailed explanation into GraphQL and making a server for it, you can check out the excellent guide that I learned from [here](https://www.robinwieruch.de/graphql-apollo-server-tutorial).
