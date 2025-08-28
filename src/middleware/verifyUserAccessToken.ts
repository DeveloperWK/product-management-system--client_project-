import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { prisma } from "../config/db.config";

const verifyUserAccessToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const SECRET = process.env._JWT_SECRET;
  const accessToken = req.access_token || req.cookies.access_token;
  const token_type = req.token_type;
  if (token_type === "customer") {
    return next();
  }
  try {
    const decodedToken = jwt.verify(accessToken, SECRET!) as JwtPayload;
    if (!decodedToken) {
      return res.status(401).json({ message: "Unauthorized Token not valid" });
    }
    const user = await prisma.user.findUnique({
      where: {
        id: decodedToken.userId,
      },
      select: {
        email: true,
        name: true,
        id: true,
      },
    });
    if (!user) {
      return res.status(401).json({ message: "UnauthorizedToken not found" });
    }
    req.user = user;
    next();
  } catch (e) {
    return res
      .status(401)
      .json({ message: "Unauthorized Some error occurred", e });
  }
};
export default verifyUserAccessToken;
