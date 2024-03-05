const todosRouter = require('express').Router();
const Todo = require('../models/todo'); // Asegúrate de que estás importando los modelos adecuados

todosRouter.post('/', async (request, response) => {
    const { user } = request;
    if (!user) {
        return response.sendStatus(401);
    }
    const { text, telefono } = request.body;

    try {
        const newTodo = await Todo.create({
            text,
            telefono,
            userId: user.id
        });

        response.status(201).json(newTodo);
    } catch (error) {
        console.error(error);
        response.status(500).json({ error: 'Error al crear un nuevo Todo' });
    }
});

todosRouter.get('/', async (request, response) => {
    const { user } = request;
    if (!user) {
        return response.sendStatus(401);
    }

    try {
        const todos = await Todo.find({ userId: user.id });
        response.status(200).json(todos);
    } catch (error) {
        console.error(error);
        response.status(500).json({ error: 'Error al obtener los Todos' });
    }
});

todosRouter.delete('/:id', async (request, response) => {
    const { user } = request;
    const todoId = request.params.id;
    console.log(request.params.id);
    if (!user) {
        return response.sendStatus(401);
    }

    try {
        await Todo.findOneAndDelete({ _id: todoId })
        response.status(204).send();
    } catch (error) {
        console.error(error);
        response.status(500).json({ error: 'Error al eliminar el Todo' });
    }
});

todosRouter.patch('/:id', async (request, response) => {
    const { user } = request;
    const todoId = request.params.id;

    if (!user) {
        return response.sendStatus(401);
    }

    const { text, telefono } = request.body;

    try {
        await Todo.findOneAndUpdate({ id: todoId }, { text, telefono });
        response.sendStatus(200);
    } catch (error) {
        console.error(error);
        response.status(500).json({ error: 'Error al actualizar el Todo' });
    }
});

module.exports = todosRouter;

