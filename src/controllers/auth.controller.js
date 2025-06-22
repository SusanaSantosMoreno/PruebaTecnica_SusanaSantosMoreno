const authService = require('../services/auth.service');
const jwt = require('jsonwebtoken');

const { generateToken } = require('../utils/jwt');

exports.register = async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await authService.createUser(username, password);
        res.status(201).json({ message: 'User created', user: { id: user._id, username: user.username } });

    } catch (err) { res.status(400).json({ message: err.message }) }
};

exports.login = async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await authService.validateUser(username, password);
        if (!user) return res.status(401).json({ message: 'Invalid credentials' });

        const accessToken = generateToken({ id: user._id, username: user.username }, '15m');
        const refreshToken = jwt.sign({ id: user._id, username: user.username }, process.env.JWT_REFRESH_SECRET, 
            { expiresIn: '7d' });

        res.status(200).json({ accessToken, refreshToken });

    } catch (err) { res.status(500).json({ message: err.message }) }
};

exports.refresh = (req, res) => {
    const refreshToken = req.body.refreshToken;

    if (!refreshToken) return res.status(401).json({ message: 'Missing refresh token' });

    jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET, (err, user) => {
        if (err) return res.status(403).json({ message: 'Invalid refresh token' });

        const newAccessToken = generateToken({ id: user.id, username: user.username }, '15m');
        res.json({ accessToken: newAccessToken });
    });
};

exports.profile = (req, res) => {
    res.json({ message: 'Protected profile', user: req.user });
};

