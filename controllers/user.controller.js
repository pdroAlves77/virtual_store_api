const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
//const jwt = require('jsonwebtoken');
//const bcrypt = require('bcryptjs');
//const config = require('../config/config');
//const RequestStatus = require('../utils/requestStatus');
//const TokenBlacklist = require('../blacklist-token/blacklist.model');
const User = require('../models/user.model');

/*function generateToken(params = {}) {
    return jwt.sign({ params }, config.secret, {
        expiresIn: config.timer
    });
};*/
const sgMail = require('@sendgrid/mail');

exports.getUsers = async (req, res) => {
    try{
        let users;
        const page = parseInt(req.query.page) || 1;   // página atual
        const limit = parseInt(req.query.limit) || 10; // registros por página   
        const skip = (page - 1) * limit;
        let totalPages = 0;
        let total = 0;

        if(req.query.name){
            total = await User.countDocuments({ name: { '$regex': `.*${req.query.name}.*`, '$options': 'i' } });
            
            users = await User.find({ name: { '$regex': `.*${req.query.name}.*`, '$options': 'i' }}).skip(skip).limit(limit);
        }else {
            total = await User.countDocuments();
            users = await User.find({}).skip(skip).limit(limit);
        }
        totalPages = Math.ceil(total / limit);
        if(users) {
            return res.status(202).json({
                total: total,
                totalPages: totalPages,
                data: users,
                page: page,
                limit: limit
            });
        }else {
            return res.status(400).json({message: 'An error has occured!'});
        } 
        
        
    }catch (error) {
        return res.status('400').send({message: error.message});
    }

};

exports.getUser = async (req, res) => {
    try {
        let user = await User.findById({_id: req.params.id});

        if(user) {
            return res.status(202).json(user);
        }else {
            return res.status(400).json({message:'An error has occured.'});
        }
       
    } catch (error) {
        return res.status(400).send({message: "User not found."});
    }
};


exports.createUser = async (req, res) => {
    try {
        let user = req.body;
        user.password = await bcrypt.hashSync(user.password, 10);
        const newUser = await User.create(user);
        newUser.password = undefined;

        if(newUser) {
            const msg = {
                to: user.email, // destinatário
                from: 'phsalves9@gmail.com', // remetente verificado
                subject: 'Welcome to Sports!',
                text: 'Este é um teste usando a SendGrid API',
                html: '<strong>Este é um teste usando a SendGrid API</strong>',
            };

            sgMail
            .send(msg)
            .then(() => {
                console.log('E-mail enviado com sucesso!');
            })
            .catch((error) => {
                console.error('Erro ao enviar e-mail:', error);
            });
            return res.status(201).send({ message: "User created!", data: newUser });
        } else {
            return res.status(400).send({ message: "An error has occured! User not created!" });
        }
    } catch (error) {
        return res.status(400).send(error.message);
    }
};

exports.updateUser = async (req, res) => {
    try {
        const userId = req.params.id;

        const user = req.body;

        const userUpdated = await User.findByIdAndUpdate(userId, { $set: user }, { new: true });

        if (userUpdated) {
            return res.status(202).json({ message: "User Updated", data: userUpdated });
        } else {
            return res.status(400).json({ message: "An error has occured! User not updated!"});
        }

    } catch (error) {
        return res.status(400).json(error.message);
    }
};

exports.deleteUser = async (req, res) => {
    try {
        const userId = req.params.id;
        const deletedUser = await User.deleteOne({ _id: userId });

        if (deletedUser.deletedCount > 0) {
            return res.status(200).json({ message: "User deleted" });
        } else {
            return res.status(400).json({ message: "Sorry, user not deleted!" });
        }
    } catch (error) {
        return res.status(400).send(error);
    }
};

exports.logout = async (req, res) => {
    const token = req.headers.authorization;

    if (!token)
        return res.status(RequestStatus.BAD_REQUEST).json({ message: "Nenhum token fornecido!" });

    if (!await TokenBlacklist.findOne({ token: token })) {
        await TokenBlacklist.create({ token });
        return res.status(RequestStatus.OK).json({ message: "Logout realizado!" });
    } else {
        return res.status(RequestStatus.NOT_MODIFIED).json({ message: "Logout já realizado!" });
    }
};