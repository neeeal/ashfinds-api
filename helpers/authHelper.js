const db = require('../db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config()

async function verifyPassword (userDetails, password){
    const correctPassword = await bcrypt.compare(password, userDetails.password);
    if (!correctPassword)
        throw new Error('Incorrect password');
}

async function userRoleVerification (username_email){
    const query = `
    SELECT * FROM users WHERE (username = $1 OR email = $1) LIMIT 1;
    `
    const values = [username_email];
    const result = await db.query(query, values);

    if (result.rows.length === 0) 
        return false;

    const user = result.rows[0];

    user.role = 'user'

    return user;
}

async function adminRoleVerification (username_email){
    const query = `
    SELECT * FROM admin WHERE (username = $1 OR email = $1) LIMIT 1;
    `
    const values = [username_email];
    const result = await db.query(query, values);

    if (result.rows.length === 0) 
        return false;

    const user = result.rows[0];

    user.role = 'admin'

    return user;
}

async function createToken (userDetails){
    const token = jwt.sign(
        {username: userDetails.username, role: userDetails.role, user_id: userDetails.user_id},
        process.env.SECRET_KEY,
        {
            expiresIn: "8h"
        },
    );

    return token;
}

async function verifyUsernameEmail (username_email){
    const userRole = await userRoleVerification(username_email);
    const adminRole = await adminRoleVerification(username_email);

    if (!userRole && !adminRole) 
        throw new Error('User does not exist');

    const userDetails = userRole || adminRole;

    return userDetails;
}

exports.validateLoginCredentials = async function (username_email, password){
    const userDetails = await verifyUsernameEmail(username_email);

    await verifyPassword(userDetails, password)


    const token = await createToken(userDetails);

    return token;
}

