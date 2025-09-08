import { getPrismaInstance } from "../config/db.config";
import { RefreshTokenParams } from "../type";

const prisma = getPrismaInstance();

async function storeRefreshToken({
  userId,
  customerId,
  token,
}: RefreshTokenParams) {
  // Validate inputs
  if (!userId && !customerId) {
    throw new Error("Either userId or customerId must be provided");
  }
  if (userId && customerId) {
    throw new Error("Provide only userId OR customerId, not both");
  }

  // Expiration date = now + 15 days
  const expiresAt = new Date();
  expiresAt.setDate(expiresAt.getDate() + 15);

  // Build where clause safely
  const whereClause = userId
    ? { userId } // upsert by userId
    : { customerId: customerId as string }; // upsert by customerId

  // Build create data explicitly
  const createData: {
    token: string;
    expiresAt: Date;
    userId?: string;
    customerId?: string;
  } = {
    token,
    expiresAt,
  };

  if (userId) createData.userId = userId;
  if (customerId) createData.customerId = customerId;

  const updateData = {
    token,
    expiresAt,
  };

  return prisma.refreshToken.upsert({
    where: whereClause,
    create: createData,
    update: updateData,
  });
}

// Update existing refresh token
type UpdateRefreshTokenParams = {
  userId?: string;
  customerId?: string;
  token: string;
};

async function updateRefreshToken({
  userId,
  customerId,
  token,
}: UpdateRefreshTokenParams) {
  // Ensure at least one is provided
  if (!userId && !customerId) {
    throw new Error("Either userId or customerId must be provided");
  }
  // Ensure only one is provided
  if (userId && customerId) {
    throw new Error("Provide only userId OR customerId, not both");
  }

  // Expiration = now + 15 days
  const expiresAt = new Date();
  expiresAt.setDate(expiresAt.getDate() + 15);

  // Build type-safe update object
  const updateData = {
    token,
    expiresAt, // matches Prisma field name, maps to `expires_at`
  };

  // Type-safe where clause
  const whereClause = userId
    ? { userId } // TypeScript knows this is string
    : { customerId: customerId as string }; // Type assertion ensures string

  return prisma.refreshToken.update({
    where: whereClause,
    data: updateData,
  });
}

// Delete refresh token
async function deleteRefreshToken(userId?: string, customerId?: string) {
  if (!userId && !customerId) {
    throw new Error("Either userId or customerId must be provided");
  }

  const whereClause = userId ? { userId: userId } : { customerId: customerId };

  await prisma.refreshToken.delete({
    where: whereClause,
  });
}

export { deleteRefreshToken, storeRefreshToken, updateRefreshToken };
