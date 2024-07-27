import { ApolloServer } from '@apollo/server';

export const connectGraphQL = ()=>{
    const server = new ApolloServer({
        typeDefs: `type Query { hello:String }`,
        resolvers: {
            Query: {
                hello: () => 'Hello, World!',
            },
        }
    
});
    return server;
}

