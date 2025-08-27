import { NextFunction, Request, Response } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { prisma } from '../config/db.config';

const verifyCustomerAccessToken = async (req:Request, res:Response, next:NextFunction) => {
const SECRET = process.env._JWT_SECRET;
  const accessToken = req.access_token || req.cookies.access_token;
try{
  const decodedToken = jwt.verify(accessToken, SECRET!) as JwtPayload;
  if(!decodedToken){
    return res.status(401).json({ message: "Unauthorized Token not valid" });
  }
  const customer = await prisma.customer.findUnique({
    where: {
      id: decodedToken.userId,
    },
    select:{
      email:true,
      firstName:true,
      id:true,
      phone:true
    }
  })
  if(!customer){
    return res.status(401).json({ message: "UnauthorizedToken not found" });
  }
  req.customer=customer
  next()

}catch (e) {
  return res
    .status(401)
    .json({ message: "Unauthorized Some error occurred", e });
}
}
export default verifyCustomerAccessToken;