const jwt = require('jsonwebtoken')
const EmployeeService = require('../services/EmployeeService');

exports.verifyToken = async (req, res, next) => {
    console.log("Request headers are: ", req.headers);
    const bearerHeader = req.headers['authorization'];
    if (!bearerHeader) {
        console.log('Auth header does not exist.')
        return res.status(403).json({ message: 'Unautherized' })
    }
    const token = bearerHeader.split(' ')[1];
    if (!token) {
        console.log('Token does not exist.')
        return res.status(403).json({ message: 'Token does not exist' })
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SEC);
        req.token = decoded;
        next();
    }
    catch (error) {
        console.log('Token validation failed.');
        return res.status(401).json({ message: 'Unauthorized' });
    }
}

exports.verifyHR = async (request, response, next) => {
    try {
        const { userId } = request.token;
        const user = await EmployeeService.getProfile(userId);
        if (!user.isHR) {
            return response.status(403).json({ message: 'Unauthorized' });
        }
        next();
    } catch (error) {
        console.log('Token validation failed.');
        return response.status(401).json({ message: 'Unauthorized' });
    }
}
