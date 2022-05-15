module.exports = {
    count: {
        subscribe: (parent, args, { pubSub, request }, info) => {
            let count = 0;
            setInterval(() => {
                count++;
                pubSub.publish("count", {
                    count
                })
            }, 1000)
            return pubSub.asyncIterator("count")
        }
    },
    comment: {
        subscribe(parent, args, {pubSub}, info){
            return pubSub.asyncIterator(`COMMENT - ${args.postId}`)
        }
    },
    post :{
        subscribe(parent, args, {pubSub}, info){
            return pubSub.asyncIterator("post")
        }
    }
}