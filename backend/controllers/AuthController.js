const ObjectAlreadyExistsException = require('../exceptions/ObjectAlreadyExistsException');
const jwt = require('jsonwebtoken');
const AuthService = require('../services/AuthService');

exports.signup = async (req, res) => {
    try {
        const emailToken = req.params.token;
        const registrationEmail = await AuthService.findRegistrationEmail(emailToken);
        const { username, email, password } = req.body
        const { firstName, middleName, lastName, preferredName } = registrationEmail
        const newUser = await AuthService.signup(username, email, password, firstName, middleName, lastName, preferredName)
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
        res.status(201).json({ jwt: jwtToken })
    } catch (err) {
        console.error(err);
        if (err instanceof ObjectAlreadyExistsException) {
            return res.status(409).json({ message: 'Username or email already exists.' });
        }
        return res.sendStatus(500);
    }
}
