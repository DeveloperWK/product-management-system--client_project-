import { prisma } from '../config/db.config';

const attributeOperations = {
  create: async (name: string) => {
    try {
      return await prisma.attribute.create({
        data: { name },
      });
    }catch (e) {
      throw e;
    }

  },

  getAll: async () => {
    try {
      return await prisma.attribute.findMany({
        include: { values: true },
      });
    }catch (e) {
      throw e;
    }

  },

  getById: async (id: string) => {
    try {
      return await prisma.attribute.findUnique({
        where: { id },
        include: { values: true },
      });
    } catch (error) {

      throw error;
    }
  },

  getByName: async (name: string) => {
    try {
      return await prisma.attribute.findUnique({
        where: { name },
        include: { values: true },
      });
    } catch (error) {

      throw error;
    }
  },

  update: async (id: string, data: { name?: string }) => {
    try {
      return await prisma.attribute.update({
        where: { id },
        data,
      });
    } catch (error) {

      throw error;
    }
  },

  delete: async (id: string) => {
    try {
      return await prisma.attribute.delete({
        where: { id },
      });
    } catch (error) {

      throw error;
    }
  },
};

const attributeValueOperations = {
  create: async (value: string, attributeId: string) => {
    try {
      return await prisma.attributeValue.create({
        data: {
          value,
          attribute: { connect: { id: attributeId } },
        },
      });
    } catch (error) {

      throw error;
    }
  },

  getAll: async () => {
    try {
      return await prisma.attributeValue.findMany({
        include: {
          attribute: true,
          products: true,
        },
      });
    } catch (error) {

      throw error;
    }
  },

  getById: async (id: string) => {
    try {
      return await prisma.attributeValue.findUnique({
        where: { id },
        include: {
          attribute: true,
          products: true,
        },
      });
    } catch (error) {

      throw error;
    }
  },

  update: async (
    id: string,
    data: { value?: string; attributeId?: string },
  ) => {
    try {
      const updateData: any = {};
      if (data.value) updateData.value = data.value;
      if (data.attributeId) {
        updateData.attribute = { connect: { id: data.attributeId } };
      }

      return await prisma.attributeValue.update({
        where: { id },
        data: updateData,
      });
    } catch (error) {

      throw error;
    }
  },

  delete: async (id: string) => {
    try {
      return await prisma.attributeValue.delete({
        where: { id },
      });
    } catch (error) {
     
      throw error;
    }
  },
}


export { attributeOperations, attributeValueOperations };
