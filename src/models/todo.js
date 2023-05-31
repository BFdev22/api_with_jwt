const mongoose = require("mongoose");

const TodoSchema = new mongoose.Schema({
    username: {type: String, required: true},
    reminder: {type: String, required: true},
    completed: {type: Boolean, required: true, default: false}
})

module.exports = mongoose.model('Todo', TodoSchema)