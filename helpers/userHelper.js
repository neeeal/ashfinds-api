const db = require('../db');

exports.isTaken = async function(username, email) {
  const query = `
    SELECT username 
    FROM users 
    WHERE 
      ( username = $1 OR email = $2 ) AND 
      deletedat IS NULL; 
  `;
  const values = [username, email];
  const results = await db.query(query, values);

  if (results.rows.length !== 0) {
    throw new Error("Username already taken");
  }
}
