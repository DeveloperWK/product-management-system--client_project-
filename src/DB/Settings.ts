import { getPrismaInstance } from '../config/db.config';

const prisma = getPrismaInstance();
// Create Setting
export async function createSetting(data: {
  name: string;
  image: string;
  logo: string;
  cover: string;
}) {
  return await prisma.settings.create({
    data,
  });
}

// Get All Settings
export async function getAllSettings() {
  return await prisma.settings.findMany();
}

// Get Single Setting by ID
export async function getSettingById(id: string) {
  return await prisma.settings.findUnique({
    where: { id },
  });
}

// Update Setting by ID
export async function updateSetting(id: string, data: Partial<{
  name: string;
  image: string;
  logo: string;
  cover: string;
}>) {
  return await prisma.settings.update({
    where: { id },
    data,
  });
}

// Delete Setting by ID
export async function deleteSetting(id: string) {
  return await prisma.settings.delete({
    where: { id },
  });
}
