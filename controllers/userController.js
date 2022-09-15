const User = require('../models/userModel.js');
const { getToken, verifyToken } = require('../utils/userToken.js');

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
                    name: userFound.name,
                    surname: userFound.surname,
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

    updateUser: async (req, res) => {
        const userId = req.userId;

        const userFound = await User.findOne({_id : userId});

        if(userId.length != 24) {
            return res.status(500).json({error: 'UserIdNotValid.'});
        }

        if(!userFound) {
            return res.status(500).json({error: 'UserNotFound'});
        }else{
            const { nickname, email } = req.body;
            userFound.nickname = nickname;
            userFound.email = email;
        }

        const createdUser = await userFound.save();
    
        if(createdUser) { 
            return res.send('Informacion Actualizada');
        }

        res.json(userFound);
    },

    deleteUser: async (req, res) => {
        const  userId  = req.params.id;
       
        const userFound = await User.findOne({ _id : userId})
        if (!userFound){
            return res.status(500).json({ error: 'UserNotFound' });
        }
        
        userFound.deleteOne({ _id: userId }, function(err, result) {
            if (err) {
                console.log ('delete Err:',err);
                res.send(err);
            } else {
                console.log('delete result:', result);
                res.send(result);
            }
          });
        }

};

module.exports = userController;
