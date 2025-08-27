import { prisma } from '../config/db.config';


async function storeRefreshToken(
  userId?: string ,
  customerId?: string,
  // @ts-ignore
  token: string
) {
  const expiresAt = new Date();
  expiresAt.setDate(expiresAt.getDate() + 15);


  if (!userId && !customerId) {
    throw new Error('Either userId or customerId must be provided');
  }


  const whereClause = userId
    ? { userId: userId }
    : { customerId: customerId };

  const createData = {
    token: token,
    expires_at: expiresAt,
    ...(userId && { userId: userId }),
    ...(customerId && { customerId: customerId }),
  };

  const updateData = {
    token: token,
    expires_at: expiresAt,
  };

  await prisma.refreshToken.upsert({
    where: whereClause,
    create: createData,
    update: updateData,
  });
}

// Update existing refresh token
type  updateRefreshTokenParameter={
  userId?: string ,
  customerId?: string ,
  token: string
}
async function updateRefreshToken({userId=undefined,customerId=undefined,token}:updateRefreshTokenParameter) {
  if (!userId && !customerId) {
    throw new Error('Either userId or customerId must be provided');
  }

  const whereClause = userId
    ? { userId: userId }
    : { customerId: customerId };

  await prisma.refreshToken.update({
    where: whereClause,
    data: {
      token: token,
    },
  });
}

// Get refresh token
// async function getRefreshToken(userId: string | null, customerId: string | null) {
//   if (!userId && !customerId) {
//     throw new Error('Either userId or customerId must be provided');
//   }
//
//   const whereClause = userId
//     ? { userId: userId }
//     : { customerId: customerId };
//
//   return await prisma.refreshToken.findUnique({
//     where: whereClause,
//   });
// }

// Delete refresh token
async function deleteRefreshToken(userId?: string, customerId?: string) {
  if (!userId && !customerId) {
    throw new Error('Either userId or customerId must be provided');
  }

  const whereClause = userId
    ? { userId: userId }
    : { customerId: customerId };

  await prisma.refreshToken.delete({
    where: whereClause,
  });
}



export {
  storeRefreshToken,
  updateRefreshToken,
  deleteRefreshToken
};