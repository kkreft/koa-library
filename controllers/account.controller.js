const UtilService = require('../services/util.service');
const JwtService = require('../services/jwt.service');

module.exports = {

    async signup(ctx){
        try {
            let {login, password} = ctx.request.body;

            if (!login) {
                ctx.throw(400, 'please provide the login')
            }
            if (!password) {
                ctx.throw(400, 'please provide the password')
            }

            const encryptedPassword = await UtilService.hashPassword(password);
            await ctx.db.account.create({
                login,
                password: encryptedPassword
            });
            ctx.body = 'Signup successful!';
        }
        catch (err) {
            ctx.throw(500, err);
        }

    },
    async login(ctx){
        try {
            let {login, password} = ctx.request.body;

            if (!login) {
                ctx.throw(400, 'please provide the login')
            }
            if (!password) {
                ctx.throw(400, 'please provide the password')
            }

            const account = await ctx.db.account.findOne({
                where: {
                    login
                }
            });
            if (!account) {
                ctx.throw(500, 'unable to prcoess request');
            }

            const matched = UtilService.comparedPassword(password, account.password);
            if (matched) {
                const token = JwtService.issue({
                    payload:{
                        account: account.id
                    }
                },'1 day');

                ctx.body = {token};
            } else {
                ctx.throw(401, 'Invalid login or password');
            }
        }
        catch (err) {
            ctx.throw(500, err);
        }
    }
};