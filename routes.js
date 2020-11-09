module.exports = function routes(greetapp) {

    const greetings = require('./greetings');
   // const greetapp = greetings(greetapp);

    async function homePage(req, res) {
        res.render("greet", {
            counter: await greetapp.counter()
            
          })
        }
       
        
    async function greet(req, res) {
        var name = req.body.names
        var language = req.body.language
      
        if (!language && !name) {
          req.flash("info", "Please select language and name")
      
        }
    
      
        else if (language === undefined) {
          req.flash("info", "Please select language")
      
        }
      
        else if (name === '') {
          req.flash("info", "Please enter name")
      
        } else {
          var text = await greetapp.greeter(name, language);
        }
      
        res.render("greet", {
          message: text,
          counter: await greetapp.counter(),
      
        })
    }
      

    async function namesGreeted(req, res) {
        res.render("greeted", {
            listOfUsers: await greetapp.getNames(),

          })
        }

    async function onePersonCounter(req, res) {
        var name = req.params.names;
  var count = await greetapp.greetedUsersCount(name);


  res.render("message", {
    message: `Hello, ${name} you have been greeted ${count} time(s)`
  })
    }

    async function reset(req, res) {

        var reseted = req.body.button

        if (!reseted) {
            req.flash("info", "counter has been reseted")
        
          }
        await greetapp.resetBtn();
        res.redirect("/")
      

    }

    return {
        homePage,
        greet,
        namesGreeted,
        onePersonCounter,
        reset

    }
}
    
