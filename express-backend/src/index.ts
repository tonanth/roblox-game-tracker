import { Client } from 'pg';

import SQLEngine from './sql-engine';

import express = require('express');
import cors = require('cors')

const app = express();
const port: number = 4321;

const sqlengine = new SQLEngine()

app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
  res.send('roblox-game-tracker')
})

app.put('/addurl', async (req, res) => {
  const url = req.body.url
  const hasURL = await

  console.log(req.body.url)
  
  res.end()
})

app.listen(port, () => {
  console.log(`example app listening on port ${port}`)
})