const { v4 } = require("uuid")
const { getUserEmail } = require("../utils/getUserEmail")
module.exports = {
    createUser(parent, args, { db }, info) {
        const match = db.users.some(user => user.email === args.data.email)
        if (match) {
            throw new Error("Email already taken.")
        }
        let user = {
            id: v4(),
            name: args.data.name,
            email: args.data.email
        }
        db.users.push(user)
        return user;
    },
    createPost(parent, args, { db, pubSub, req }, info) {
        const userEmail = getUserEmail(req)
        // const userFound = db.users.some(user => user.id === args.data.author)
        // if (userFound) {
        if (userEmail) {
            let post = {
                id: v4(),
                published: false,
                ...args.data
            }
            db.posts.push(post)
            if (post.published) {
                pubSub.publish("post", {
                    post: {
                        mutation: "CREATED",
                        data: post
                    }
                })
            }
            return post
        }
        // }
    },
    createComment(parent, args, { db, pubSub }, info) {
        const userFound = db.users.some(user => user.id === args.data.creator);
        const postFound = db.posts.some(post => post.id === args.data.post && post.published)
        if (userFound && postFound) {
            let comment = {
                id: v4(),
                ...args.data
            }
            db.comments.push(comment);
            pubSub.publish(`COMMENT - ${args.data.post}`, {
                comment
            })
            return comment;
        } else {
            throw new Error("Unable to find User/Post")
        }
    },
    deleteComment(parent, args, { db }, info) {
        const position = db.comments.findIndex(comment => comment.id === args.id)
        if (position >= 0) {
            const deletedComment = db.comments.splice(position, 1)
            return deletedComment[0];
        } else {
            throw new Error("Unable to find Comment")
        }
    },
    deletePost(parent, args, { db }, info) {
        const position = db.posts.findIndex(post => post.id !== args.id)
        if (position >= 0) {
            db.comments = db.comments.filter(comment => comment.post === args.id)
            const deletedPost = db.posts.splice(position, 1)
            return deletedPost[0]
        } else {
            throw new Error("Unable to delete Post")
        }
    },
    deleteUser(parent, args, { db }, info) {
        const position = db.users.findIndex(user => user.id === args.id)
        if (position >= 0) {
            db.posts = db.posts.filter(post => {
                db.comments = db.comments.filter(comment => comment.post !== post.id)
                return post.author !== args.id
            })
            db.comments = db.comments.filter(comment => comment.creator !== args.id)
            const deletedUser = db.users.splice(position, 1)
            return deletedUser[0];
        } else {
            throw new Error("Unable to delete User")
        }
    }
}