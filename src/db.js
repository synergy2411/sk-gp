let users = [
    { id: "101", name: "John", email: "john@test.com", age: 23 },
    { id: "102", name: "Alice", email: "alice@test.com", age: 32 },
    { id: "103", name: "Jenny", email: "jenny@test.com" },
]

let posts = [
    { id: "201", title: "GraphQL for beginners", body: "Awesome Course", published: false, author: "101" },
    { id: "202", title: "GraphQL 101", body: "Nice Course", published: true, author: "101" },
    { id: "203", title: "GraphQL - The Masterclass", body: "In-depth Course", published: false, author: "102" },
]

let comments = [
    { id: "301", text: "I Love it", creator: "103", post: "201" },
    { id: "302", text: "I like it", creator: "103", post: "202" },
    { id: "303", text: "Very nice course", creator: "102", post: "201" },
    { id: "304", text: "See you soon", creator: "101", post: "203" },
]

module.exports = { users, posts, comments }