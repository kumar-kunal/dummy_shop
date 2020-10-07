import jwt from "jsonwebtoken";
const sharedKey = process.env.SHARED_KEY


function checkAccessToken(req) {
	let token = req.headers['authorization'];
	if(!token){
		jwt.verify(token, sharedKey)
	}
	token = token.split(" ")[1]
	req.user = jwt.verify(token, sharedKey)
}

module.exports = {
	checkAccessToken: checkAccessToken,
};
