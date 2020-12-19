const mongoose = require("mongoose")
const Schema = mongoose.Schema

const todosSchema = new Schema({
  id: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  completed: {
    type: Boolean,
    required: true
  }
})

const TODOS = mongoose.model("todos", todosSchema)
module.exports = TODOS
