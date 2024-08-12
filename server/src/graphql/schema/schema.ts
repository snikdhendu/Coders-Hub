export const schema = `#graphql

type Links {
    github: String,
    linkedIn: String,
    portfolio: String,
    twitter: String,
    leetcode: String
}

type User {
    clerkUserId: String!,
    firstName: String!,
    lastName: String,
    profileUrl: String,
    email: String!,
    collegeName: String,
    location: String,
    links: Links,
}

type Query {
    hello: String,
    signup: String,
    getUserById(clerkUserId: String!): User!,
}

type UpdateUserResponse {
    user: User,
    msg: String
}

type Mutation {
    UPDATE_USER(clerkUserId: String!, collegeName: String, location: String,github:String,
        linkedIn:String,
        twitter:String,
        portfolio:String,
        profileUrl: String): UpdateUserResponse
}

`
