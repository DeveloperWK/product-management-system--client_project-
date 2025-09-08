import { serialize } from 'cookie';
import { Response } from 'express';
import generateAccessToken from '../service/jwt.service';
import { generateRefreshToken, hashRefreshToken } from '../service/refreshToken.service';
import { storeRefreshToken } from '../service/token.service';

const isProd = process.env.NODE_ENV === "production";

const baseCookieOptions = {
  httpOnly: true,
  path: "/",
  sameSite: isProd ? ("none" as const) : ("lax" as const),
  secure: isProd,
};

async function issueTokensAndSetCookies(
  userId: string,
  res: Response,
  tokenType: string
) {
  const accessToken = generateAccessToken({ userId });
  const refreshToken = generateRefreshToken();
  await storeRefreshToken({ userId: userId, customerId: undefined, token: hashRefreshToken(refreshToken) });
  await setCookies(res, accessToken, refreshToken, tokenType, userId);
}
const setCookies = async (
  res: Response,
  accessToken: string,
  refreshToken: string,
  tokenType?: string,
  userId?: string
) => {
  const cookieOptions = [
    serialize("access_token", accessToken, {
      ...baseCookieOptions,
      maxAge: 60 * 15, // 15 minutes
    }),
    serialize("refresh_token", refreshToken, {
      ...baseCookieOptions,
      maxAge: 60 * 60 * 24 * 365 * 10, // 10 years
    }),
  ];

  if (tokenType) {
    cookieOptions.push(
      serialize("token_type", tokenType, {
        ...baseCookieOptions,
        maxAge: 60 * 60 * 24 * 365 * 10, // 10 years
      })
    );
  }

  if (userId) {
    cookieOptions.push(
      serialize("user_id", userId.toString(), {
        ...baseCookieOptions,
        maxAge: 60 * 60 * 24 * 365 * 10, // 10 years
      })
    );
  }

  res.setHeader("Set-Cookie", cookieOptions);
};

const sendUpdatedAccessToken = async (res: Response, accessToken: string) => {
  res.setHeader("Set-Cookie", [
    serialize("access_token", accessToken, {
      ...baseCookieOptions,
      maxAge: 60 * 15, // 15 minutes
    }),
  ]);
};

const sendUpdatedRefreshToken = async (res: Response, refreshToken: string) => {
  res.setHeader("Set-Cookie", [
    serialize("refresh_token", refreshToken, {
      ...baseCookieOptions,
      maxAge: 60 * 60 * 24 * 365 * 10, // 10 years
    }),
  ]);
};

export {
  issueTokensAndSetCookies,
  sendUpdatedAccessToken,
  sendUpdatedRefreshToken,
  setCookies,
};
