import { prisma } from '../config/db.config';

async function storeRefreshToken(userId: number, token: string) {
  const expiresAt = new Date();
  expiresAt.setDate(expiresAt.getDate() + 15);
  await prisma.refreshToken.upsert({
    where: { userId: userId },
    create: {
      token: token,
      expires_at: expiresAt,
      userId: userId,
    },
    update: {
      token: token,
      expires_at: expiresAt,
    },
  });
}

async function updateRefreshToken(userId: number, token: string) {
  const expiresAt = new Date();
  expiresAt.setDate(expiresAt.getDate() + 15);
  await prisma.refreshToken.update({
    where: { userId: userId },
    data: {
      token: token,
    },
  });
}

export { storeRefreshToken, updateRefreshToken };
