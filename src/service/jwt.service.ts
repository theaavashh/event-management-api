import jwt from "jsonwebtoken";


const generateToken = (payload:string) => {
	const token=jwt.sign({payload},process.env.JWT_SECRET_KEY as string);
	return token;
};


export default generateToken;


