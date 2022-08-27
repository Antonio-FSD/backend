const { verifyToken } = require("./userToken");

const Auth = {
    checkAuth: async (req, res, next) => {
        try{

            const token = req.headers.authorization;
            const tokenVerification = verifyToken(token); 
            
            if ( tokenVerification.success ) {
                req.userId = tokenVerification.content.userId;
                return next()
            }
            
            throw new Error()

        }catch(error){

            return res.status(401).send(`No se encontró el token de usuario o ha expirado: ${error.message}`);

        }
    }
};

module.exports = Auth;