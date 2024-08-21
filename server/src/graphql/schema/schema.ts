
export const schema = `#graphql
type Links {
    github: String,
    linkedIn: String,
    portfolio: String,
    twitter: String,
    leetcode: String
}

type Project {
  projectName: String!
  tagline: String!
  description: String!
  technologies: [String]
  githubRepoLink: String
  liveLink: String
  images: [String]
  logo: String
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
    projects: [Project] 
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

    CREATE_PROJECT(clerkUserId: String!, projectName: String!, tagline: String!, description: String!,technologies: [String],githubRepoLink: String,liveLink: String):Project 
}

`
