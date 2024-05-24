const db = require('../db');

exports.get = async function (req, res)  {
    try {
      const result = await db.query('SELECT * FROM users');
      res.json(result.rows);
    } catch (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
    }
}