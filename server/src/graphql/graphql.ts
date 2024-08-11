import { ApolloServer } from '@apollo/server';
import { schema } from "./schema/schema.js";
import { graphqlResolvers } from './resolvers/resolvers.js';


export const connectGraphQL = ()=>{
    const server = new ApolloServer({
        typeDefs: schema,
        resolvers: graphqlResolvers,
});
    return server;
}

