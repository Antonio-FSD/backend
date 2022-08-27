const jwt = require ('jsonwebtoken');

const getToken = (userId) => { 
	return jwt.sign({ userId: userId }, process.env.TOKEN_ID, {expiresIn: '30d'}) 
};

// VERIFICAR TOKEN. Solo devuelve true o false 
const verifyToken = (token) => {
	const verificationStatus = jwt.verify(token, process.env.TOKEN_ID, function(err, decoded) {
		if (err) return { success: false }
		return { success: true, content: decoded } 
	})
	return verificationStatus
};

// OBTENER INFO DEL TOKEN. Te devuelve la info que este dentro del token. De momento solo el userId
const getDataToken = (token) => {
	const decodedInfoToken = jwt.verify(token, process.env.TOKEN_ID, function(err, decoded) {
		if (err) return err
		return {
			userId: decoded.userId,
		}
	})
	return decodedInfoToken
}

module.exports = {
	getToken,
	verifyToken,
	getDataToken,
}