const jwt = require("jsonwebtoken");

const getUserEmail = request => {

    const authHeader = request.req.headers.authorization 
    let token = null;
    if(authHeader){
        token = authHeader.replace("Bearer ", "");
    }else if(request.connectionParams.Authorization){
        token = request.connectionParams.Authorization
    }
    const decode = jwt.verify(token, "SecretKey");
    console.log("DECODE -> ", decode)
    return decode.email;
    
    throw new Error("Authorization require")

}

module.exports = {
    getUserEmail
}