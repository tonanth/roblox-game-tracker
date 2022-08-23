const { Pool } = require('pg');
const express = require('express');
const cors = require('cors')

const app = express();
app.use(express.json())
app.use(cors())
const port = 3001;

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'roblox_game_tracker',
  password: 'password',
  port: 5432
});

pool.on('error', (err, client) => {
  console.error('Unexpected error on idle client', err)
  process.exit(-1)
});

// (async () => {
//   const client = await pool.connect() 
//   try {
//     const res = await client.query('select * from roblox_game_tracker')
//     console.log(res.rows[0])
//   } finally {
//     client.release()
//   }
// })().catch(err => console.log(err.stack)) 

app.get('/status', (req, res) => {
  res.send('roblox-game-tracker');
})

app.get('/api/getgamedata'), async (req, res) => {
  const client = await pool.connect();
  const query = 'select * from roblox_game_tracker'
  try {
    const queryres = await client.query(query)
    res.send(queryres);
  } catch (err) {
    console.log(err.stack)
  } finally {
    client.release();
  }
}

app.put('/api/addgameurl', async (req, res) => {
  const client = await pool.connect();
  const query = 'insert into roblox_game_tracker (url) values ($1) on duplicate key update url=url'
  values = {url : req.body.url}
  try {
    const res = await client.query(query, values);
  } catch(err) {
    console.log(err.stack);
  } finally {
    client.release();
  }
});

app.listen(port, () => {
  console.log(`Server started, listening on port ${port}`)
});