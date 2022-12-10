const loginRauter = require('express').Router();
const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


loginRauter.post('/', async (request, response) => {
    const { email, password } = request.body;
    const userExist = await User.findOne({email});
    console.log(password);
    console.log(userExist);
    if (!userExist) {
        return response.status(400).json({error:'Email o contraseña invalida;'})
    }
    const passwordValidation = await bcrypt.compare(password, userExist.passwordHash)
    if (!passwordValidation) {
        return response.status(400).json({error: 'Email o contraseña invalidos'})
    }

    const userForToken = {
        id: userExist._id,
        email: userExist.email
    }
    
    const accessToken = jwt.sign(userForToken, process.env.ACCESS_TOKEN,{expiresIn:'1d'})
    
    response.cookie('acessToken', accessToken,{
    expires:new Date (Date.now()+1000 * 60 * 60 * 24),
    secure: false,
    httpOnly: true,
    });
    
    response.status(200).json(userExist._id)
});



module.exports = loginRauter;
