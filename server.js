const Koa = require('koa');
const bodyParser = require('koa-parser');
const db = require('./models');
const router = require('./routes');
const PORT = 3000;

const app = new Koa();

db.sequelize.sync()
    .then(() => console.log('synced'))
    .catch((err) => console.log(err));

app.context.db = db;
app.use(bodyParser());

app.use(router.routes());
app.listen(PORT);

console.log(`Server is listening on PORT ${PORT}`);
