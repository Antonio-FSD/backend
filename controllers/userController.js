const req = require('express/lib/request');
const res = require('express/lib/response');
const User = require('../models/userModel.js');
const { getToken } = require('../utils/userToken.js');

const userController = {
    postRegister: async (req, res) => {
        const { name, surname, nickname, email, password } = req.body;

        const userFound = await User.findOne({email: email});

        if (userFound) return res.status(500).send({
            error: 'emailUsed'
        }); 

        const nicknameFound = await User.findOne({nickname: nickname});
        
        if (nicknameFound) return res.status(500).send({
            error: 'nicknameUsed'
        });

        const newUser = new User();

        newUser.name = name;
        newUser.surname = surname;
        newUser.nickname = nickname;
        newUser.email = email;
        newUser.password = password;
    
        const createdUser = await newUser.save();
    
        if(createdUser) {  
            return res.send('Estás registrado');
        } else {
            res.status(500).send('No se ha podido registrar al usuario');
        };
        
        
    },

    postLogin: async (req, res) => {
        const { nickname, password } = req.body;

        const userFound = await User.findOne({nickname: nickname});

        if (!userFound) return res.status(404).json({
            success: false,
            message: 'El usuario no existe'
        });
     
        if (userFound.password == password) {
            return res.json({
                token: getToken(userFound.id),
                profile: {
                    nickname: userFound.nickname,
                    email: userFound.email,
                    id: userFound._id
                }
            });
        } else {
            res.status(500).json('Pass incorrecta');
        };        

    },

    getUsers: async (req, res) => {
        const usersList = await User.find();
        res.json(usersList);
    },

};

module.exports = userController;
