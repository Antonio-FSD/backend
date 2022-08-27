// Importamos ficheros
const req = require('express/lib/request');
const res = require('express/lib/response');
const mongoose = require('mongoose');
const User = require('../models/userModel.js');
const { getToken } = require('../utils/userToken.js');
const Schema = mongoose.Schema;

const userController = {
    postRegister: async (req, res) => {
        const { name, surname, nickname, email, password } = req.body;
    
        const mailTaken = await User.findOne({email: email})
        if (mailTaken) return res.status(500).send({
            error: 'emailTaken'
        }); 

        const nicknameTaken = await User.findOne({nickname: nickname})    //Igual que ({nickName})
        console.log(nicknameTaken);
        if (nicknameTaken) return res.status(500).send({
            error: 'nicknameTaken'
        });
  
        const newUser = new User();
        
            newUser.name = name;
            newUser.surname = surname;
            newUser.nickName = nickname;
            newUser.email = email;
            newUser.password = password;    
     
        const createdUser = await newUser.save();
    
        if(createdUser) {  //Igual que (createdUser !== NULL)
            return res.send('Estás registrado');
        }
    
        res.status(500).send('No estás registrado');
        
    },
    postLogin: async (req, res) => {
        console.log('Hola');
        const {nickname, password} = req.body;

        const signedUser = await User.findOne({nickname: nickname});

        if (!signedUser) return res.status(404).json({
            success: false,
            message: 'Usuario no registrado'
        });

        if (signedUser.password == password) {
            return res.json({
                token: getToken(signedUser.id),
                profile: {
                    name: signedUser.name,
                    surname: signedUser.surname,
                    nickname: signedUser.nickName,
                    email: signedUser.email,
                    id: signedUser._id
                }
            });
        }

        res.status(500).json('Contraseña incorrecta');

    }, 
    getUsers: async (req, res) => {
        const userId = req.userId;
        console.log("Informacion del ususario ", userId);

        const usersFound = await User.findOne({_id : userId})
        if(!usersFound) {
            console.log("No existe en la BBDD el usersId", userId);
            return res.status(500).json({error: 'Users not found'});
        }

        console.log(usersFound);
        res.json(usersFound);
    },
    updateUsers: async (req, res) => {
        //Recuperamos el ID del usuario 
        const userId = req.userId;
        console.log("Informacion del ususario ha actualizar ", userId);

        //Comprobamos si es un object id 
        if(userId.length != 24) {
            console.log("El usersId no es un on objedctId (Longitud no es 24)");
            return res.status(500).json({error: 'UsersId not valid.'});
        }

        console.log("El usersId es valido, es un objectId");

        const signedUser = await User.findOne({_id : userId})
        if(!signedUser) {
            console.log("No existe en la BBDD el usersId", userId);
            return res.status(500).json({error: 'Users not found'});
        }else{
            //recuperamos informacion del body 
            const { nickName, email, password } = req.body;
            signedUser.nickName = nickName;
            signedUser.email = email;
         
            
        }

  
        // Creamos usuario y devolvemos la info a una variable para poder coger el id generado x mongo
        const createdUser = await signedUser.save();
    
        if(createdUser) {  //Igual que (createdUser !== NULL)
            return res.send('Informacion Actualizada');
        }

        res.json(usersFound);
    }

};

// Exportamos como objeto
module.exports = userController;
