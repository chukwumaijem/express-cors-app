const express = require('express');
const { JsonDB } = require('node-json-db')
const { Config } = require('node-json-db/dist/lib/JsonDBConfig');

const db = new JsonDB(new Config('./database', true, true, '/'));

const app = express();
const PORT = 5000;

app.use(express.json());
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/', (req, res) => {
  res.json(db.find());
});

app.post('/', (req, res) => {
  db.push('data', req.body);
  db.save();

  res.json({ ok: true });
});

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`)
});
