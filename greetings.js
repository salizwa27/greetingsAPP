module.exports = function greetingsApp() {
    var namesGreeted = {};

    function greeter(firstNameEntered, language) {

        addNames(firstNameEntered)

        if (language == "xhosa") {
            return "Molo, " + firstNameEntered;

        }

        else if (language == "english") {
            return "Hello, " + firstNameEntered
        }

        else if (language == "sotho") {
            return "Dumela, " + firstNameEntered
        }
    }

    function addNames(firstNameEntered) {

    

        if (namesGreeted[firstNameEntered] == undefined) {

            namesGreeted[firstNameEntered] = 0;

        }
      namesGreeted[firstNameEntered] ++;


    }

    function counter() {
     return Object.keys(namesGreeted).length
    }

    function listOfUsers(){
        return namesGreeted
    }

    function getCount(name) {
        return namesGreeted[name]
    }
    


    return {
        greeter,
        addNames,
        counter,
        listOfUsers,
        getCount
     
    }

}


