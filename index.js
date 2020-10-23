const express = require("express");
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const greetingsApp = require("./greetings")
const flash = require('express-flash');
const session = require('express-session');

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

app.get("/", async function (req, res) {
  res.render("greet")
});

// app.post("/greet", function (req, res) {

//   const firstNameEntered = req.body.firstNameEntered

//   //greetapp.addNames(firstNameEntered);

//   const language = req.body.language

//   
//     // res.render("greet")
//     // return;
//   }

//   else 
//     // res.render("greet")
//     // return;
//   }

//   res.render("greet", {
//     message: greetapp.greeter(firstNameEntered, language),
//     counter: greetapp.counter(),

//   })


// })

app.post("/greet", async function (req, res) {

  var name = req.body.names
  var language = req.body.language

  if (language === undefined) {
    req.flash("info", "Please select language")

  }

  if ( name === '') {
    req.flash("info", "Please enter name")

  } else {
    var text = await greetapp.greeter(name, language);
  }

  res.render("greet", {
    message: text,
    counter: await greetapp.counter(),



  })
})

app.get("/greeted", async function (req, res) {
  res.render("greeted", {
    listOfUsers: await greetapp.getNames(),


  })
});

app.get("/counter/:names", async function (req, res) {

  var name = req.params.names;
  var count = await greetapp.greetedUsersCount(name);

  //console.log(count)

  for (const key in count) {

    var element = count[key];


  }

  console.log(element)
  // res.render("counter", {messenger, counter:
  //   greeted.addNames(firstNameEntered)
  // })

  res.render("message", {
    message: `Hello, ${name} you have been greeted ${element} time(s)`
  })

});



let PORT = process.env.PORT || 3007;

app.listen(PORT, function () {
  console.log('App starting on port', PORT);
})