module.exports = {

    async create(ctx){
        try {
            if (!ctx.request.body.title) {
                ctx.throw(400, 'please provide the book title')
            }

            if (!ctx.request.body.author) {
                ctx.throw(400, 'please provide author\'s name')
            }

            ctx.body = await ctx.db.book.create({
                title: ctx.request.body.title,
                author: ctx.request.body.author,
                isbn: ctx.request.body.isbn
            });


        }
        catch (err) {
            ctx.throw(500, err);
        }
    },

    async find(ctx){
        try{
            ctx.body = await ctx.db.book.findAll()
        }
        catch (err){
            ctx.throw(500, err);
        }
    },

    async findOne(ctx){
        try {
            const book = await ctx.db.book.findOne({
                where: {
                    id: ctx.params.id
                }
            });

            console.log(book);
            if (!book) {
                ctx.throw(404, 'book not found');
            }
            ctx.body = book
        }
        catch (err) {
            ctx.throw(500, err)
        }
    },

    async delete(ctx){
        try {
            const results = await ctx.db.book.destroy({
                where: {
                    id: ctx.params.id
                }
            });

            results === 0 ? ctx.throw(500, 'invalid id provided') : ctx.body = `book is deleted with id ${ctx.params.id}`;

        }
        catch (err) {
            ctx.throw(500, err)
        }
    },

    async update(ctx){
        try {
            const results = await ctx.db.book.update({
                title: ctx.request.body.title,
                author: ctx.request.body.author,
                isbn: ctx.request.body.isbn
            }, {
                where: {
                    id: ctx.params.id
                }
            });

            results === 0 ? ctx.throw(500, 'invalid id provided') : ctx.body = `book is updated with id ${ctx.params.id}`;

        }
        catch (err) {
            ctx.throw(500, err)
        }
    }
};