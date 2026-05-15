import jwt from 'jsonwebtoken';

export function verifyToken(req, res, next) {
    let token = req.headers['authorization'];
    if(typeof token !== 'undefined') {
        token = token.split(' ')[1];
        jwt.verify(token, process.env.JWT_SECRET, (err, authData) => {
            if(err) {
                res.status(403).json({ message: 'Invalid token' });
            }
            else {
                req.username = authData.username;
                next();
            }
        });
    }
    else {
        res.status(403).json({ message: 'No token provided' });
    }
}