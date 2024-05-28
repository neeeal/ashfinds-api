const db = require('../db');
const authHelper = require('../helpers/authHelper');

exports.get = async function (req, res)  {
    try {
      const result = await db.query('SELECT * FROM users');
      res.json(result.rows);
    } catch (err) {
      console.error(err);
      res.status(500).send({message: 'Internal Server Error.'});
    }
}

exports.login = async function  (req, res) {
  const { username_email, password } = req.body;
  try{
    const token = await authHelper.validateLoginCredentials(username_email, password);

    res.status(200).send({
      message: "Successfully logged in",
      token: token
    })
  } catch (err) {
    console.error(err);

    if (
      err.message === 'User does not exist' || 
      err.message === 'Incorrect password'){
      return res.status(400).send({
        message: err.message
      })
    }

    res.status(500).send({message: 'Internal Server Error.'});
  }

}