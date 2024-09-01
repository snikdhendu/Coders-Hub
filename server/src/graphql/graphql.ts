import { ApolloServer } from '@apollo/server';
import { schema } from "./schema/schema.js";
import { graphqlResolvers } from './resolvers/resolvers.js';

interface MyContext {
    // Context typing
    userId: string | null;
  }


export const connectGraphQL = ()=>{
    const server = new ApolloServer<MyContext>({
        typeDefs: schema,
        resolvers: graphqlResolvers,
});
    return server;
}

