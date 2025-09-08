import { Request, Response } from "express";
import {
  createSetting,
  deleteSetting,
  getAllSettings,
  getSettingById,
  updateSetting,
} from "../../DB/Settings";
import imageUploadService from "../../service/image-upload.service";

const settingsCreate = async (req: Request, res: Response) => {
  try {
    const { name } = req.body;
    const logoFile = req.files && (req.files as any).logo?.[0];
    const coverFile = req.files && (req.files as any).cover?.[0];
    const imageFile = req.files && (req.files as any).image?.[0];

    const filesToUpload = [
      { key: "logo", file: logoFile },
      { key: "cover", file: coverFile },
      { key: "image", file: imageFile },
    ].filter((item) => item.file);

    if (filesToUpload.length === 0) {
      return res.status(400).json({ error: "No files provided" });
    }
    const uploadResults = await Promise.all(
      filesToUpload.map((item) => imageUploadService(item.file))
    );
    const uploadedMap: Record<string, string> = {};
    filesToUpload.forEach((item, index) => {
      //@ts-ignore
      uploadedMap[item.key] = uploadResults[index];
    });
    const finalData = {
      name,
      logo: uploadedMap.logo,
      cover: uploadedMap.cover,
      image: uploadedMap.image,
    };
    await createSetting(finalData);
    res.status(201).json({
      success: true,
      message: `Setting ${name} created.`,
      finalData,
    });
  } catch (e: any) {
    res.status(400).json({ error: e.message });
  }
};

const getSettingAll = async (_req: Request, res: Response) => {
  try {
    const settings = await getAllSettings();
    res.status(200).json({
      success: true,
      settings,
    });
  } catch (e: any) {
    res.status(400).json({ error: e.message });
  }
};

const getSettingId = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const setting = await getSettingById(id);
    res.json(setting);
  } catch (e: any) {
    res.status(400).json({ error: e.message });
  }
};
const settingDelete = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const setting = await deleteSetting(id);
    res.json(setting);
  } catch (e: any) {
    res.status(400).json({ error: e.message });
  }
};
const settingUpdate = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const data = req.body;
    const setting = await updateSetting(id, data);
    res.json(setting);
  } catch (e: any) {
    res.status(400).json({ error: e.message });
  }
};

export {
  getSettingAll,
  getSettingId,
  settingDelete,
  settingsCreate,
  settingUpdate,
};
