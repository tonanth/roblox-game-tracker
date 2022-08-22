// import { Pool, Client } from 'pg';

// const pool = new Pool({
//     host: 'localhost',
//     database: 'roblox-game'
// })

// pool.query('SELECT NOW()', (err, res) => {
//     console.log(err, res)
//     console.log('???')
//     pool.end()
// })

// console.log('aaaa')

const { Pool, Client } = require('pg')
// pools will use environment variables
// for connection information
const pool = new Pool({
    database: 'roblox-game-tracker',
    password: 'password'
})


const test_query = async () => {
    const res = await pool.query('SELECT * FROM test')
    console.log(res)
    console.log('should print last')
}

test_query()






pool.end()


