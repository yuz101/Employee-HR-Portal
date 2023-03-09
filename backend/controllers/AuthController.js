const ObjectAlreadyExistsException = require('../exceptions/ObjectAlreadyExistsException');
const jwt = require('jsonwebtoken');
const AuthService = require('../services/AuthService');
const HRService = require('../services/HRService');

exports.signup = async (req, res) => {
    try {
        const emailToken = req.params.token;
        const registrationEmail = await HRService.findRegistrationEmail(emailToken);
        const { username, email, password } = req.body
        const { _id, firstName, middleName, lastName } = registrationEmail
        const newUser = await AuthService.signup(username, email, password, firstName, middleName, lastName)
        const jwtToken = jwt.sign(
            {
                userId: newUser._id,
                username: newUser.username,
            },
            process.env.JWT_SEC,
            {
                expiresIn: '3d',
            }
        )
        await HRService.updateRegistrationEmail(_id, { status: 'registered' })
        res.status(201).json({ jwt: jwtToken, isHR: newUser.isHR })
    } catch (err) {
        console.error(err);
        if (err instanceof ObjectAlreadyExistsException) {
            return res.status(409).json({ message: 'Username or email already exists.' });
        }
        return res.sendStatus(500);
    }
}


exports.login = async (req, res) => {
    try {
        const { username, email, password } = req.body
        const user = await AuthService.login(username, email, password)
        const token = jwt.sign(
            {
                userId: user._id,
                username: user.username,
            },
            process.env.JWT_SEC,
            {
                expiresIn: '3d',
            }
        )
        res.status(201).json({ jwt: token, isHR: user.isHR })
    } catch (err) {
        console.error(err);
        if (err instanceof ObjectAlreadyExistsException) {
            return res.status(409).json({ message: 'Username or email already exists.' });
        }
        return res.sendStatus(500);
    }
}
