require("dotenv").config();
const express = require('express');
const mongoose = require('mongoose');
const mongoString = process.env.DATABASE_URL;
const routes = require('./src/routes/routes');
const cors = require("cors");
const TodoRouter = require("./src/controllers/todo")

mongoose.connect(mongoString);
const database = mongoose.connection

database.on('error', (error) => {
    console.log(error)
})

database.once('connected', () => {
    console.log('Database Connected');
})

const app = express();

app.use(cors())
app.use(express.json());
app.use('/api', routes)
app.use("/todos", TodoRouter) // send all "/todos" request to TodoROuter

const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log(`Server Started at ${PORT}`)
})