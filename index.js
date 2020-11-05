const express = require("express");
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const greetingsApp = require("./greetings")
const flash = require('express-flash');
const session = require('express-session');
const routes = require("./routes")

const pg = require("pg");
const Pool = pg.Pool;

const connectionString = process.env.DATABASE_URL || 'postgresql://salizwa:salizwa123@localhost:5432/greetingsApp';

const pool = new Pool({
  connectionString
});

const greetapp = greetingsApp(pool);

const app = express();

app.use(express.static('public'));

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

app.use(session({
  secret: "<add a secret string here>",
  resave: false,
  saveUninitialized: true
}));

//initialise the flash middleware
app.use(flash());

var Routes = routes(pool)

app.get("/", Routes.homePage);


app.post("/greet", Routes.greet) 



app.get("/greeted", Routes.namesGreeted) 
;

app.get("/counter/:names", Routes.onePersonCounter)

app.get("/reset", Routes.reset) 


let PORT = process.env.PORT || 3007;

app.listen(PORT, function () {
  console.log('App starting on port', PORT);
})