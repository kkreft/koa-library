const { decode } = require('jsonwebtoken');
const JwtService = require('../services/jwt.service');
module.exports = async (ctx, next) => {
    let token = '';

    if (ctx.req.headers && ctx.req.headers.authorization) {
        // splitting due to "Bearer " part at the beginning
        token = ctx.req.headers.authorization.split(' ')[1];
    }
    else {
        ctx.throw(401, 'Authorization header is missing');
    }

    const decodedToken = JwtService.verify(token);

    const  account = await ctx.db.account.findOne({
        where: {
            id : decodedToken.payload.account
        }
    });
    
    if(account){
        ctx.state.account = account.id;
        await next();
    }
    else{
        ctx.throw(401, 'Unauthorized');
    }
};
