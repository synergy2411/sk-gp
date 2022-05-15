const jwt = require("jsonwebtoken");

module.exports = {
    comments(parent, args, {db}, info) {
        return db.comments;
    },
    posts(parent, args, {db}, info) {
        return db.posts;
    },
    users(parent, args, {db}, info) {
        if (!args.query) {
            return db.users;
        } else {
            return db.users.filter(user => user.name.toLowerCase().includes(args.query.toLowerCase()))
        }
    },
    me() {
        return { id: "abc123", name: "Sumit K", email: "sumit@test.com" }
    },
    login(parent, args, {req, db}, info){
        const {email, password} = args.data;
        const position = db.users.findIndex(user => user.email === email )
        if(position >= 0){
            const token = jwt.sign({email, password}, "SecretKey")
            return {
                token,
                user : db.users[position]
            }
        }else{
            throw new Error("Email/password required")
        }
    }
}