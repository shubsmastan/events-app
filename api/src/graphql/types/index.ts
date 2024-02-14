export const typeDefs = `type User {
  _id: ID!
  username: String!
  email: String!
  password: String
  createdEvents: [Event!]
  attendingEvents: [Event!]
}

type UserAuth {
  userId: ID!
  token: String!
  tokenExpiry: Int!
}

type Event {
  _id: ID!
  name: String!
  location: String!
  description: String!
  price: Int!
  date: String!
  createdBy: User!
  attendees: [String]
}

type Query {
  getUser(username: String!): User
  getEvent(_id: ID!): Event
  getEvents: [Event!]!
  userLogin(username: String!, password: String!): UserAuth!
}

type Mutation {
  createUser(username: String, email: String, password: String): User
  createEvent(
    name: String!
    location: String!
    description: String!
    price: Int!
    date: String!
  ): Event
  bookEvent(eventId: String): Event!
  cancelBooking(eventId: String): Event!
}
`;
