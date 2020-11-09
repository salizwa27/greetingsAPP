module.exports = function greetingsApp(pool) {

    async function greeter(firstNameEntered, language) {

        firstNameEntered = firstNameEntered.charAt(0).toUpperCase() + firstNameEntered.slice(1);

        var check = await checkName(firstNameEntered)

        if (check === 0) {

            await insertNames(firstNameEntered)
        } else{
        await updateCounter(firstNameEntered)
}

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
        name = name.charAt(0).toUpperCase() + name.slice(1);
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

    }

}


