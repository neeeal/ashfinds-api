const db = require('../db');
const moment = require('moment');

exports.get = async function (req, res) {
    try {
      const result = await db.query('SELECT * FROM users');
      res.json(result.rows);
    } catch (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
    }
}

exports.post = async function (req, res) {
  try {
    const createdAt = moment().format('YYYY-MM-DD HH:mm:ss');
    const {username, password} = req.body;

    console.log(createdAt, username, password);
    const query = `
      INSERT INTO users (username, password, createdAt)
      VALUES ($1, $2, $3)
      RETURNING *;`;
    const values = [username, password, createdAt];

    const result = await db.query(query, values);

    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
}