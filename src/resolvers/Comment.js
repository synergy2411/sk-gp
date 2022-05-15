module.exports = {
    creator(parent, args, {db}, info) {
        return db.users.find(user => user.id === parent.creator)
    },
    post(parent, args, {db}, info){
        return db.posts.find(post => post.id === parent.post)
    }
}