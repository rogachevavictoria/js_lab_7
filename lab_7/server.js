const express = require(`express`);
const pug = require(`pug`);
const path = require(`path`);
const methodOverride = require('method-override');

const router = require(path.join(__dirname, './routes/books'));

const app = express();
const PORT = process.env.PORT || 3000;

app.engine('pug', pug.__express);
app.set(`views`, path.join(__dirname + '/public/html'));
app.set(`view engine`, `pug`);

app.use(methodOverride('_method')); 

//body parser middleware 
app.use(express.json());
app.use(express.urlencoded({extended: true }));

//api routes
app.use('/api/books', router);
app.use('/', router);
app.use('/card', router);

app.use(express.static(path.join(__dirname, 'public')));

app.listen(PORT, () => console.log(`server started on @ ${PORT}`)); 
