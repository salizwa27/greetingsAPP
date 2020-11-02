const assert = require('assert');
const greetingsApp = require("../greetings")
const pg = require("pg");
const Pool = pg.Pool;
const connectionString = process.env.DATABASE_URL || 'postgresql://salizwa:salizwa123@localhost:5432/greetings_test';
const pool = new Pool({
    connectionString
});

describe('The greetings function', function() {
    beforeEach(async function() {
        // clean the tables before each test run
        await pool.query("delete from greet;");
    });
    it('should greet the user with the language selected', async function() {
        // the Factory Function is called greet
        let greetings = greetingsApp(pool);
        assert.equal("Hello, Salizwa", await greetings.greeter('Salizwa', "english"))
    })

    it('should be able to greet the user with different languages', async function() {

        let greetings = greetingsApp(pool);
        assert.equal("Hello, Endinako", await greetings.greeter('Endinako', "english"))
        assert.equal("Molo, Linomtha", await greetings.greeter('Linomtha', "xhosa"))
        assert.equal("Dumela, Salizwa", await greetings.greeter('Salizwa', "sotho"))
    });

    it('should return an error message if user did not enter a name and language', async function() {

        let greetings = greetingsApp(pool);
        assert.equal(undefined, await greetings.greeter('', ""))
    })

    it('should return an error message if user did not enter a Language', async function() {

        let greetings = greetingsApp(pool);
        assert.equal(undefined, await greetings.greeter("Salizwa", ""))
    }), 

    it('should return an error message if user did not enter a Name', async function() {

        let greetings = greetingsApp(pool);
        assert.equal(undefined, await greetings.greeter("", "Hello, "))
    })

    it('should be able to count for each user that is greeted', async function() {

        let greetings = greetingsApp(pool);
        await greetings.insertNames('Salizwa')
        await greetings.insertNames('Saneze')
        await greetings.insertNames('Lisakazi')
        assert.equal(3, await greetings.counter())
    })

})

describe('Insert names and Get names on database', function() {
    beforeEach(async function() {
        // clean the tables before each test run
        await pool.query("delete from greet;");

    });
    it('should insert name and update counter for Salizwa', async function() {

        let greetings = greetingsApp(pool);
        var name = await greetings.insertNames('Salizwa');

        await greetings.checkName('Salizwa');


        //var count = await greetings.greetedUsersCount('Salizwa');
         
//console.log(count);

        // for (const key in count) {

        //     var element = count[key];
        // }

        if (name) {
            await greetings.updateCounter('Salizwa')
            await greetings.updateCounter('Salizwa')
            await greetings.updateCounter('Salizwa')
        }

        assert.equal(4, await greetings.greetedUsersCount('Salizwa'))
    })


    after(function() {
        pool.end();
    })
})
   