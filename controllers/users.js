const usersRouter = require('express').Router();
const User = require('../models/user'); // Asegúrate de que estás importando los modelos adecuados
const bcrypt = require('bcrypt');

usersRouter.post('/', async (request, response) => {
    const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[0-9]).{8,24}$/;
    const { email, password } = request.body;



    try {
        const userExist = await User.findOne({ email: email });
        console.log(email);

        console.log(userExist);

        if (userExist) {
            return response.status(400).json({ error: 'El email ya existe' });
        } else if (!PASSWORD_REGEX.test(password)) {
            return response.status(400).json({ error: 'La contraseña es incorrecta' });
        }

        const saltRounds = 10;
        const passwordHash = await bcrypt.hash(password, saltRounds);

        await User.create({
            email,
            passwordHash
        });

        response.sendStatus(201);
    } catch (error) {
        console.error(error);
        response.status(500).json({ error: 'Error al crear un nuevo usuario' });
    }
});

module.exports = usersRouter;
