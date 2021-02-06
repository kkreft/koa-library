module.exports = {

    async create(ctx){

        try {

            const reader = await ctx.db.reader.create({
                name: ctx.request.body.name,
                city: ctx.request.body.city
            });

            ctx.body = await ctx.db.borrow.create({
                bookId: ctx.request.body.bookId,
                readerId: reader.id
            });
        }
        catch (err) {
            ctx.throw(500, err);
        }
    }
};