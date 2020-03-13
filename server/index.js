const express = require('express');
const { JsonDB } = require('node-json-db')
const { Config } = require('node-json-db/dist/lib/JsonDBConfig');

const db = new JsonDB(new Config('./database', true, true, '/'));

const app = express();
const PORT = 5000;

app.use(express.json());
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000"); // update to match the domain you will make the request from or * to allow all
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  next();
});

app.get('/', (req, res) => {
  const data = db.getData('/')

  res.json({ data });
});

app.post('/', (req, res) => {
  db.push(`/${req.body.id}`, req.body);

  res.json({ ok: true });
});

app.put('/:id', (req, res) => {
  const { id } = req.params;
  db.push(`/${id}`, req.body, false)

  res.json({ ok: true });
});

app.delete('/:id', (req, res) => {
  const { id } = req.params;
  db.delete(`/${id}`)

  res.json({ ok: true });
});

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`)
});
