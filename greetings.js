module.exports = function greetingsApp(pool) {
   // var namesGreeted = {};

   async function greeter(firstNameEntered, language) {

    //var name = name.toUpperCase().charAt(0) + name.slice(1);

       // addNames(firstNameEntered)
        var check = await checkName(firstNameEntered)
        if(check === 0){
          await  insertNames(firstNameEntered)

        } await updateCounter(firstNameEntered)


        if (language === "xhosa") {
            return "Molo, " + firstNameEntered;

        }

        else if (language === "english") {
            return "Hello, " + firstNameEntered
        }

        else if (language === "sotho") {
            return "Dumela, " + firstNameEntered
        }
    }

    // function addNames(firstNameEntered) {

    

    //     if (namesGreeted[firstNameEntered] == undefined) {

    //         namesGreeted[firstNameEntered] = 0;

    //     }
    //   namesGreeted[firstNameEntered] ++;


    // }

    // function counter() {
    //  return Object.keys(namesGreeted).length
    // }

    // function listOfUsers(){
    //     return namesGreeted
    // }

    // function getCount(name) {
    //     return namesGreeted[name]
    // }
    
    async function insertNames(name) {
        name = name.charAt(0).toUpperCase() + name.slice(1);
        const insertUser = await pool.query('INSERT INTO greet (name, counter) VALUES($1,$2)', [name, 1])
        return insertUser.rows;
    }

    async function getNames() {
        const user = await pool.query('select name from greet')
        return user.rows;
    }

    async function checkName(name) {
        name = name.charAt(0).toUpperCase() + name.slice(1);
        const user = await pool.query('select name from greet where name=$1', [name])
        return user.rowCount;
    }

    async function updateCounter(name) {
        name = name.charAt(0).toUpperCase() + name.slice(1);
        const onePersonCounter = await pool.query('update greet set counter = counter + 1 where name=$1', [name]); 
        return onePersonCounter.rows
    }

    async function counter() {
        const count = await pool.query('select id from greet')
        return count.rowCount
    }

    async function greetedUsersCount(name) {
       // name = name.charAt(0).toUpperCase() + name.slice(1);
        const namesGreeted = await pool.query('select counter from greet where name=$1', [name])
        return namesGreeted.rows[0].counter
    }

    async function resetBtn() {
        await pool.query('delete from greet')
        
    }


    return {
        greeter,
        insertNames,
        getNames,
        checkName,
        updateCounter,
        counter,
        greetedUsersCount,
        resetBtn,

      //  addNames,
       // counter,
      //listOfUsers
       // getCount
     
    }

}


