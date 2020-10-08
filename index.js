const express = require("express");
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const greetingsApp = require("./greetings")
const flash = require('express-flash');
const session = require('express-session');

const greetapp = greetingsApp();

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

app.get("/", function (req, res) {
  res.render("greet")
});

// app.post("/greet", function (req, res) {

//   const firstNameEntered = req.body.firstNameEntered

//   //greetapp.addNames(firstNameEntered);

//   const language = req.body.language

//   if (firstNameEntered == "") {
//     req.flash("info", "Please enter name")
//     // res.render("greet")
//     // return;
//   }

//   else if (language == undefined) {
//     req.flash("info", "Please select language")
//     // res.render("greet")
//     // return;
//   }
 
//   res.render("greet", {
//     message: greetapp.greeter(firstNameEntered, language),
//     counter: greetapp.counter(),

//   })


// })

app.post("/greet", function (req, res) {

  
  

  var name = req.body.greet

  var language = req.body.language
  res.render("greet", {
    message: greetapp.greeter(name, language),
    counter: greetapp.counter(),



  })
})

app.get("/greeted", function (req, res) {
  res.render("greeted", {
    listOfUsers: greetapp.listOfUsers(),


  })
});

app.get("/counter/:messenger", function (req, res) {

  var name = req.params.messenger;
  var count = greetapp.getCount(name)
  // res.render("counter", {messenger, counter:
  //   greeted.addNames(firstNameEntered)
  // })

  res.render("message", {
    message: `Hello, ${name} you have been greeted ${count} time(s)`
  })

});



let PORT = process.env.PORT || 3007;

app.listen(PORT, function () {
  console.log('App starting on port', PORT);
})