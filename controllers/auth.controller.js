const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/user.model');
const TokenBlacklist = require('../models/blacklist.model');

function generateToken(params = {}) {
    const secretKey = 'QZx7k!43f2L#u9XrGm@t$NvP5&h^EkzTqW1YD8AjBnCU0so6IjMVlRye3KHapwb';
    return jwt.sign({ params }, secretKey, {
        algorithm: 'HS256',
        expiresIn: '1m'
    });
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email }).select('+password');
        if (!user) {
            return res.status(404).send({ message: "Usuário não encontrado!" });
        }
        if (!await bcrypt.compare(password, user.password)) {
            return res.status(400).send({ message: "Senha inválida!" });
        }
        user.password = undefined;
        return res.send({ data: user, token: generateToken({ id: user.id }) });  
    } catch (error) {
        return res.status(400).send({ message: error.message });
    }
};

exports.logout = async (req, res) => {
    const token = req.headers.authorization;

    if (!token)
        return res.status(403).json({ message: "Nenhum token fornecido!"});
    if (!await TokenBlacklist.findOne({ token: token})) {
        await TokenBlacklist.create({ token });
        return res.status(201).json({ message: "Logout realizado com sucesso!" });
    }else {
        return res.status(403).json({ message: "Token já foi invalidado!" });
    }   
}