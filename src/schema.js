const { gql } = require("apollo-server")

module.exports = gql`
type Query {
  me: User!
  users(query: String): [User!]!
  posts: [Post!]!
  comments: [Comment!]!
  login(data: LoginInput ): LoginInputPayload!
}
type Mutation {
  createUser(data: CreateUserInput) : User!
  createPost(data: CreatePostInput) : Post!
  createComment(data: CreateCommentInput) : Comment!
  deleteComment(id: ID!) : Comment!
  deletePost(id: ID!) :Post!
  deleteUser(id: ID!) : User!
}
type Subscription {
  count: Int!
  comment(postId: ID!) : Comment!
  post: PostSubscriptionPayload!
}
type LoginInputPayload{
  token: String!
  user: User!
}
input LoginInput{
  email: String!
  password: String!
}
input CreateCommentInput{
  text: String!
  creator: ID!
  post: ID!
}
input CreatePostInput {
  title: String!
  body: String!
  published: Boolean
}
input CreateUserInput {
  name: String!
  email: String!
}
type Comment {
  id: ID!
  text: String!
  creator: User!
  post: Post!
}
type Post {
  id: ID!
  title: String!
  body: String!
  published: Boolean!
  author: User!
  comments: [Comment!]!
}
type User {
  id: ID!
  name: String!
  email: String
  age: Int
  posts: [Post!]!
  comments: [Comment!]!
}
type PostSubscriptionPayload {
  mutation: String!
  data: Post!
}
`