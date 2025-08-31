import crypto from "node:crypto";
import { getPrismaInstance } from "../config/db.config";
import { RefreshToken } from "../type";

const prisma = getPrismaInstance();

const generateRefreshToken = (): string => {
  return crypto.randomBytes(64).toString("hex");
};

const hashRefreshToken = (token: string): string => {
  return crypto.createHash("sha256").update(token).digest("hex");
};
const safeCompare = (userSendToken: string, tokenFromDB: string): boolean => {
  const userSendTokenBuffer = Buffer.from(userSendToken);
  const tokenFromDBBuffer = Buffer.from(tokenFromDB);
  if (userSendTokenBuffer.length !== tokenFromDBBuffer.length) return false;
  return crypto.timingSafeEqual(userSendTokenBuffer, tokenFromDBBuffer);
};
const verifyRefreshToken = async (
  receivedToken: string
): Promise<boolean | null> => {
  const hashed = hashRefreshToken(receivedToken);
  const refresh_token = await prisma.refreshToken.findUnique({
    where: { token: hashed },
  });
  const refreshToken = refresh_token as RefreshToken | null;
  if (!receivedToken) {
    console.error("Database error verifying refresh token");

    throw new Error(`Failed to verify token due to a database error`);
  }
  if (!safeCompare(hashed, refreshToken?.token!)) {
    console.error("Token mismatch");
    return null;
  }
  if (!refreshToken) {
    return null; // Token not found (or not matching the hashed version)
  }
  const expiryDate = new Date(refreshToken.expires_at);
  if (new Date() > expiryDate) {
    throw new Error("Token expired");
  }
  return true;
};

export { generateRefreshToken, hashRefreshToken, verifyRefreshToken };
