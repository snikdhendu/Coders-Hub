import express from "express";
import cors from "cors";
import { errorMiddleware } from "./middlewares/error.js";
import morgan from "morgan";
import bodyParser from 'body-parser';
import dotenv from "dotenv";
import { connectGraphQL } from "./graphql/graphql.js";
import { expressMiddleware } from "@apollo/server/express4";
import { connectDB } from "./db/connectDb.js";
// import { Webhook } from 'svix';
// import { User } from './models/User';
// import { Request, Response } from 'express';

dotenv.config({ path: "./.env" });

export const envMode = process.env.NODE_ENV?.trim() || "DEVELOPMENT";
const port = process.env.PORT || 3000;
const app = express();
const graphqlServer = connectGraphQL();
await graphqlServer.start();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: " * ", credentials: true }));
// app.use(morgan("dev"));
app.use("/graphql", expressMiddleware(graphqlServer));

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

// your routes here
app.get("*", (req, res) => {
  res.status(404).json({
    success: false,
    message: "Page not found",
  });
});

app.use(errorMiddleware);

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL!);
    app.listen(port, () => console.log("Server is working on Port:" + port + " in " + envMode + " Mode."));
  } catch (error) {
    console.log('Error connecting to database or listening on port:', error);
  }
};

start();