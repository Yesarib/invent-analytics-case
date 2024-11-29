const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors');
const createError = require("http-errors");
const userRoutes = require('./routes/user')
const bookRoutes = require('./routes/book')

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json({ extended: true }))
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.use('/users', userRoutes)
app.use('/books', bookRoutes)

module.exports = app;
