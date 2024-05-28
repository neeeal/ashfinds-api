const db = require('../db');
const moment = require('moment');
const userHelper = require('../helpers/userHelper');
const bcrypt = require('bcrypt');

exports.get = async function (req, res) {
    try {
      const result = await db.query();
      return res.json({
        message: "Succesfully retrieved all users",
        data: result.rows
      });
    } catch (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
    }
}

exports.getOne = async function (req, res) {
  try {
    const user_id = req.params.user_id;
    const query = 'SELECT * FROM users WHERE user_id = $1 LIMIT 1;'
    const values = [user_id];

    const result = await db.query(query, values);

    return res.json({
      message: "Succesfully retrieved all users",
      data: result.rows
    });
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
}

exports.post = async function (req, res) {
  const createdAt = moment().format('YYYY-MM-DD HH:mm:ss');
  const {username, password, firstname, lastname, email} = req.body;
  const saltRounds = 8;

  try {
    await userHelper.isTaken(username, email);

    const hashed_password = await bcrypt.hash(password, saltRounds);

    const query = `
      INSERT INTO users (username, password, createdAt, firstname, lastname, email)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING *;`;
    const values = [username, hashed_password, createdAt, firstname, lastname, email];

    const result = await db.query(query, values);

    res.json(result.rows);
  } catch (err) {
    if(err.message === "Username already taken" ){
      return res.status(400).send({
        message: err.message
      })
    }

    console.error(err);
    res.status(500).send('Internal Server Error');
  }
}