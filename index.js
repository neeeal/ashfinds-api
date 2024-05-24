require('dotenv').config()

const port = process.env.PORT || 8080;
const express = require('express');
const cors = require('cors');
const initRoutes = require('./routes');

const app = express();

app.use(express.json());
app.use(cors());
app.use(express.static("public"));
app.use((err, req, res, next)=>{
  res.status(err.status || 500);
  res.json({
    error: err.message
  });
})

initRoutes(app);

app.listen(port, ()=>{
  console.log(`Running on http://localhost:${port}`);
});

module.exports = app;