const { getUserEmail } = require("../utils/getUserEmail")

module.exports = {
    posts(parent, args, {db}, info) {
        return db.posts.filter(post => post.author === parent.id)
    },
    comments(parent, args, {db}, info){
        return db.comments.filter(comment => comment.creator === parent.id)
    },
    email(parent, args, { id, request }, info){
        const userEmail = getUserEmail(request)
        if(userEmail && userEmail === parent.email){
            return userEmail
        }else{
            return null
        }
    }
}