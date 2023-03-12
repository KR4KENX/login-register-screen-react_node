const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    email: {
        type: mongoose.SchemaTypes.String,
        required: true,
        unique: true
    },
    password: {
        type: mongoose.SchemaTypes.String,
        required: true,
    },
    createdAt: {
        type: mongoose.SchemaTypes.String,
        required: true,
        default: new Date(),
    },
    ToDoList: {
        type: Array,
        default: []
    },
    Poster: {
        type: Array,
        default: []
    }
})

module.exports = mongoose.model('users', UserSchema)