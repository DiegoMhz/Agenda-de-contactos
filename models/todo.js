const mongoose = require('mongoose');

const todosSchema = new mongoose.Schema({
    text: String,
    telefono: String,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
});

todosSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject.__v;
    }
});

const Todo = mongoose.model('Todo', todosSchema);

module.exports = Todo;