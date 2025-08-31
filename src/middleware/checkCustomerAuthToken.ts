import { NextFunction, Request, Response } from 'express';
import generateAccessToken from '../service/jwt.service';
import { generateRefreshToken, hashRefreshToken, verifyRefreshToken } from '../service/refreshToken.service';
import { updateRefreshToken } from '../service/token.service';
import { sendUpdatedAccessToken, sendUpdatedRefreshToken, setCookies } from '../utils/issueTokensAndSetCookies';
import { getPrismaInstance } from '../config/db.config';

const prisma = getPrismaInstance();
const checkCustomerAuthToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const accessToken = req.cookies.access_token;
  const refreshToken = req.cookies.refresh_token;
  const customerId = req.cookies.user_id;
  const tokenType = req.cookies.token_type;
  if (tokenType === "user") {
    req.token_type = "user";
    return next();
  }

  const isCustomerExists = await prisma.customer.findUnique({
    where: { id: customerId },
  });
  try {
    const isVerifiedRefreshToken = await verifyRefreshToken(refreshToken);
    if (isVerifiedRefreshToken && !accessToken && isCustomerExists) {
      const newAccessToken = generateAccessToken({ userId: customerId });

      await sendUpdatedAccessToken(res, newAccessToken);
      req.access_token = newAccessToken;
    }
  } catch (error) {
    console.error({
      error: error,
    });
    // @ts-ignore
    if (error instanceof Error && error.code.includes("ERR_INVALID_ARG_TYPE")) {
      const newRefreshToken = generateRefreshToken();
      await updateRefreshToken({
        customerId: customerId,
        token: hashRefreshToken(newRefreshToken),
      });
      if (!accessToken && customerId) {
        const newAccessToken = generateAccessToken({ userId: customerId });
        await setCookies(res, newAccessToken, newRefreshToken);
        req.access_token = newAccessToken;
      } else {
        await sendUpdatedRefreshToken(res, newRefreshToken);
      }
    }
  } finally {
    next();
  }
};
export default checkCustomerAuthToken;
