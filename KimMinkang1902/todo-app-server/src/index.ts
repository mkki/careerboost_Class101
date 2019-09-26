import { ApolloServer } from "apollo-server-express";
import express from "express";
import mongoose from "mongoose";

import typeDefs from "./schema";
import resolvers from "./resolvers";

import "dotenv/config";

mongoose.connect(`${process.env.MONGO_URI}`, { useNewUrlParser: true, useUnifiedTopology: true });

mongoose.connection.once("open", () => console.log("Connected to a MongoDB instance"));
mongoose.connection.on("error", error => console.error(error));

const server = new ApolloServer({
  typeDefs,
  resolvers,
  playground: {
    endpoint: "/server/playground",
    settings: {
      "editor.theme": "light"
    }
  }
});

const app = express();
server.applyMiddleware({ app, path: "/server" });

app.listen({ port: `${process.env.PORT}` }, () => console.log("Server ready"));
