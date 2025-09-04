import { Request, Response } from "express";
import { getPrismaInstance } from "../../config/db.config";
import { getUserByIdDB } from "../../DB/Users";
import { verifyPassword } from "../../service/password.service";
import { issueTokensAndSetCookies } from "../../utils/issueTokensAndSetCookies";

const prisma = getPrismaInstance();

const userLogin = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password)
      return res.status(400).json({ message: "Email & password required" });

    const user = await getUserByIdDB({ email: email });

    if (!user || !user.password)
      return res.status(401).json({ message: "Invalid credentials" });

    const passwordMatch = await verifyPassword(password, user.password);
    if (!passwordMatch) return res.status(401).send("Invalid credentials");
    const tokenType = "user";
    await issueTokensAndSetCookies(user.id, res, tokenType);

    res.status(200).json({
      message: "Login successful",
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Failed to login user" });
  }
};
const customerLogin = async (req: Request, res: Response) => {
  try {
    const { email, password, phone } = req.body;

    if ((!email || !phone) && !password)
      return res
        .status(400)
        .json({ message: "Email Or Phone & password required" });
    type CustomerIdentifier = { email: string } | { phone: string };

    let identifier: CustomerIdentifier = email ? { email } : { phone };

    const user = await prisma.customer.findUnique({
      where: identifier,
    });

    if (!user || !user.password)
      return res.status(401).json({ message: "Invalid credentials" });

    const passwordMatch = await verifyPassword(password, user.password);
    if (!passwordMatch) return res.status(401).send("Invalid credentials");
    const tokenType = "customer";
    await issueTokensAndSetCookies(user.id, res, tokenType);
    console.log(password, user.password);

    res.status(200).json({
      message: "Login successful",
      user: {
        id: user.id,
        email: user.email,
        name: user.firstName,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Failed to login user" });
  }
};
export { customerLogin, userLogin };
