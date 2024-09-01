// import express from "express";
// import cors from "cors";
// import { errorMiddleware } from "./middlewares/error.js";
// import morgan from "morgan";
// import bodyParser from 'body-parser';
// import dotenv from "dotenv";
// import { connectGraphQL } from "./graphql/graphql.js";
// import { expressMiddleware } from "@apollo/server/express4";
// import { connectDB } from "./db/connectDb.js";
// import { handleWebhook } from "./controllers/webhook.js";
// import { ClerkExpressWithAuth } from "@clerk/clerk-sdk-node";

// dotenv.config({ path: "./.env" });

// export const envMode = process.env.NODE_ENV?.trim() || "DEVELOPMENT";
// const port = process.env.PORT || 3000;
// const app = express();
// const graphqlServer = connectGraphQL();
// await graphqlServer.start();

// // app.use(express.json());

// app.use(express.urlencoded({ extended: true }));

// // app.use(bodyParser.raw({ type: 'application/json' }));
// app.use(cors({ origin: true, credentials: true }));
// // app.use(morgan("dev"));

// app.use(ClerkExpressWithAuth());

// app.use(
//   '/graphql',
//   express.json(),
//   expressMiddleware(graphqlServer, {
//     context: async ({ req }:{req:any}) => {
//       // Access the user from the request object populated by Clerk
//       const {userId} = req.auth;
//       console.log("hey",req.auth); // Adjust based on Clerk's actual implementation
//       return { userId }; // Return user information in context
//     },
//   })
// );


// app.post(
//   '/api/webhook',bodyParser.raw({ type: 'application/json' }),handleWebhook);

// app.get("/", (req, res) => {
//   res.send("Hello, World!");
// });

// // your routes here
// app.get("*", (req, res) => {
//   res.status(404).json({
//     success: false,
//     message: "Page not found",
//   });
// });

// app.use(errorMiddleware);

// const start = async () => {
//   try {
//     await connectDB(process.env.MONGO_URL!);
//     app.listen(port, () => console.log("Server is working on Port:" + port + " in " + envMode + " Mode."));
//   } catch (error) {
//     console.log('Error connecting to database or listening on port:', error);
//   }
// };

// start();





import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import { connectGraphQL } from './graphql/graphql.js';
import { expressMiddleware } from '@apollo/server/express4';
import { connectDB } from './db/connectDb.js';
import { handleWebhook } from './controllers/webhook.js';
import { ClerkExpressWithAuth } from '@clerk/clerk-sdk-node';
import { errorMiddleware } from './middlewares/error.js';

dotenv.config({ path: './.env' });

export const envMode = process.env.NODE_ENV?.trim() || 'DEVELOPMENT';
const port = process.env.PORT || 3000;
const app = express();
const graphqlServer = connectGraphQL();
await graphqlServer.start();

// Configure CORS
const allowedOrigins = ['http://localhost:5173', 'https://coders-hub-pink.vercel.app'];
app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
}));

app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.raw({ type: 'application/json' }));

app.use(ClerkExpressWithAuth());

app.use(
  '/graphql',
  express.json(),
  expressMiddleware(graphqlServer, {
    context: async ({ req }:{req:any}) => {
      const { userId } = req.auth;
      console.log('GraphQL Context:', req.auth);
      return { userId };
    },
  })
);

app.post('/api/webhook', handleWebhook);

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

app.get('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'Page not found',
  });
});

app.use(errorMiddleware);

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL!);
    app.listen(port, () => console.log(`Server is working on Port: ${port} in ${envMode} Mode.`));
  } catch (error) {
    console.log('Error connecting to database or listening on port:', error);
  }
};

start();
