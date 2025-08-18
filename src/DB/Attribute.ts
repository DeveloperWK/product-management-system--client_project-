import { prisma } from '../config/db.config';

const attributeOperations = {
  create: async (name: string) => {
    return await prisma.attribute.create({
      data: { name },
    });
  },

  getAll: async () => {
    return await prisma.attribute.findMany({
      include: { values: true },
    });
  },

  getById: async (id: string) => {
    return await prisma.attribute.findUnique({
      where: { id },
      include: { values: true },
    });
  },

  getByName: async (name: string) => {
    return await prisma.attribute.findUnique({
      where: { name },
      include: { values: true },
    });
  },

  update: async (id: string, data: { name?: string }) => {
    return await prisma.attribute.update({
      where: { id },
      data,
    });
  },

  delete: async (id: string) => {
    return await prisma.attribute.delete({
      where: { id },
    });
  },
};

const attributeValueOperations = {
  create: async (value: string, attributeId: string) => {
    return await prisma.attributeValue.create({
      data: {
        value,
        attribute: { connect: { id: attributeId } },
      },
    });
  },

  getAll: async () => {
    return await prisma.attributeValue.findMany({
      include: {
        attribute: true,
        products: true,
      },
    });
  },

  getById: async (id: string) => {
    return await prisma.attributeValue.findUnique({
      where: { id },
      include: {
        attribute: true,
        products: true,
      },
    });
  },

  update: async (
    id: string,
    data: { value?: string; attributeId?: string },
  ) => {
    const updateData: any = {};
    if (data.value) updateData.value = data.value;
    if (data.attributeId) {
      updateData.attribute = { connect: { id: data.attributeId } };
    }

    return await prisma.attributeValue.update({
      where: { id },
      data: updateData,
    });
  },

  delete: async (id: string) => {
    return await prisma.attributeValue.delete({
      where: { id },
    });
  },
};
export { attributeOperations, attributeValueOperations };
