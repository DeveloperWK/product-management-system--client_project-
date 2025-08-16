import prisma from '../config/db.config';
import { IUser } from '../type';

const createUser = async ({
  name,
  email,
  phone,
  password,
}: IUser): Promise<IUser | undefined> => {
  try {
    const user = await prisma.user.create({
      data: {
        name,
        email,
        phone,
        password,
      },
    });
    console.log(user);
    return user;
  } catch (err) {
    console.error(err);
    throw err;
  }
};
const updateUser = async (
  id: number,
  name?: string,
  phone?: string,
  password?: string,
  role?: string,
) => {
  try {
    const user = await prisma.user.update({
      where: {
        id: id,
      },
      data: {
        ...(name && { name }),
        ...(phone && { phone }),
        ...(password && { password }),
        ...(role && { role }),
      },
    });
    return user;
  } catch (err) {
    throw err;
  }
};
const deleteUserDb = async (id: number) => {
  try {
    const deletedUser = await prisma.user.delete({
      where: {
        id: id,
      },
    });
    return { success: true, user: deletedUser };
  } catch (err: any) {
    throw err;
  }
};
type UserIdentifier = { id: number } | { email: string };

const getUserByIdDB = async (identifier: UserIdentifier) => {
  try {
    const user = await prisma.user.findUnique({
      where: identifier,
    });

    if (!user) {
      throw new Error('User not found');
    }

    return user;
  } catch (err) {
    throw err;
  }
};
const getAllUsersDB = async () => {
  try {
    const users = await prisma.user.findMany({
      select: {
        name: true,
        email: true,
        phone: true,
        refreshToken: true,
        isActive: true,
        roles: true,
        createdAt: true,
      },
    });
    return users;
  } catch (err) {
    throw err;
  }
};
export { createUser, deleteUserDb, getAllUsersDB, getUserByIdDB, updateUser };
