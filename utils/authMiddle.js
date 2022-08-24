const { verifyToken } = require("./tokens");

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

            return res.status(401).send(`Fallo de autenticación, usuario no autorizado: ${error.message}`);

        }
    }
};

module.exports = Auth;