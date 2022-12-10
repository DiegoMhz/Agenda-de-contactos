const todosRouter = require('express').Router();
const User = require('../models/user');
const Todo = require('../models/todo');

todosRouter.post('/', async (request, response) => {
    const { user } = request;
    if (!user) {
        return response.sendStatus(401);
    }
    const { text } = request.body;
    const {telefono}=request.body;
    console.log(telefono);
    const newTodo = new Todo({
        telefono,
        text,
        user: user._id
    });
    const savedTodo = await newTodo.save();
    response.status(201).json(savedTodo);
});

todosRouter.get('/', async (request, response) => {
    const { user } = request;
    if (!user) {
        return response.sendStatus(401);
    }
    const todos = await Todo.find({ user: user._id });
    response.status(200).json(todos);
});

todosRouter.delete('/:id', async (request, response) => {
    const { user } = request;
    console.log(request.params.id);
    if (!user) {
        return response.sendStatus(401);
    }
    await Todo.findByIdAndDelete(request.params.id);
    response.status(204);
});

todosRouter.patch('/:id', async (request, response) => {
    const { user } = request;
    if (!user) {
        return response.sendStatus(401);
    }
    console.log(request.body);
    const { telefono } = request.body;
    const { text } = request.body;
    await Todo.findByIdAndUpdate(request.params.id, {text: text,
    telefono: telefono });
    response.sendStatus(200);
    console.log(telefono, text);
    
});

module.exports = todosRouter;
