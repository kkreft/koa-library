module.exports = {

    async create(ctx){
        try {
            if (!ctx.request.body.name) {
                ctx.throw(400, 'please provide the reader\'s name')
            }

            ctx.body = await ctx.db.reader.create({
                name: ctx.request.body.name,
                city: ctx.request.body.city,
            });


        }
        catch (err) {
            ctx.throw(500, err);
        }
    },

    async find(ctx){
        try{
            ctx.body = await ctx.db.reader.findAll()
        }
        catch (err){
            ctx.throw(500, err);
        }
    },

    async findOne(ctx){
        try {
            const reader = await ctx.db.reader.findOne({
                where: {
                    id: ctx.params.id
                }
            });

            console.log(reader);
            if (!reader) {
                ctx.throw(404, 'reader not found');
            }
            ctx.body = reader
        }
        catch (err) {
            ctx.throw(500, err)
        }
    },

    async delete(ctx){
        try {
            const results = await ctx.db.reader.destroy({
                where: {
                    id: ctx.params.id
                }
            });

            results === 0 ? ctx.throw(500, 'invalid id provided') : ctx.body = `reader is deleted with id ${ctx.params.id}`;

        }
        catch (err) {
            ctx.throw(500, err)
        }
    },

    async update(ctx){
        try {
            const results = await ctx.db.reader.update({
                name: ctx.request.body.name,
                city: ctx.request.body.city
            }, {
                where: {
                    id: ctx.params.id
                }
            });

            results === 0 ? ctx.throw(500, 'invalid id provided') : ctx.body = `reader is updated with id ${ctx.params.id}`;

        }
        catch (err) {
            ctx.throw(500, err)
        }
    }
};