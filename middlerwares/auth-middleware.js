import jwt from 'jsonwebtoken';

export const isAuthenticated = (req, res, next) => {
    const tokeJwt = req.get('token');
    jwt.verify(tokeJwt, process.env.APIBOOK_JWT_PASSWORD, (error, decode) =>{
        if(error){
            return res.status(401).json({
                msg: 'Token to valid'
            });
        }
        req.email = decode.email
        next();
    });
}