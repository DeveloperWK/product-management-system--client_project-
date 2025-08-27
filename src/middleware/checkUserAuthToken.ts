import { NextFunction, Request, Response } from 'express';
import { getUserByIdDB } from '../DB/Users';
import { generateRefreshToken, hashRefreshToken, verifyRefreshToken } from '../service/refreshToken.service';
import generateAccessToken from '../service/jwt.service';
import { sendUpdatedAccessToken, sendUpdatedRefreshToken, setCookies } from '../utils/issueTokensAndSetCookies';
import { updateRefreshToken } from '../service/token.service';


const checkUserAuthToken = async (req:Request, res:Response, next:NextFunction)=>{
  const user_id = req.cookies.user_id;
  const access_token = req.cookies.access_token;
  const refresh_token = req.cookies.refresh_token;
  try {
    const isUserExist = await  getUserByIdDB(user_id)
    if(!isUserExist){
      res.status(401).json({
        success: false,
        message: "User does not exist"
      })
    }
    const isVerifiedRefreshToken = await  verifyRefreshToken(refresh_token)
    if(isVerifiedRefreshToken && isUserExist && !access_token){
      const newAccessToken = generateAccessToken(user_id)
      await sendUpdatedAccessToken(res,newAccessToken)
      req.access_token = newAccessToken
    }
  }catch (e) {
    if(e instanceof Error && e.message.includes("Token expired")){
      const newRefreshToken = generateRefreshToken()
      await updateRefreshToken({userId:user_id,token:hashRefreshToken(newRefreshToken)})
      if(!access_token&& user_id){
        const newAccessToken = generateAccessToken(user_id );
       await setCookies(res, newAccessToken, newRefreshToken);
       req.access_token = newAccessToken;

      }else {
        await sendUpdatedRefreshToken(res,newRefreshToken)
      }
    }
  }finally {
    next()
  }
}
export default checkUserAuthToken;
