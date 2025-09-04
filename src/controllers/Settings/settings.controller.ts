import { createSetting, deleteSetting, getAllSettings, getSettingById, updateSetting } from '../../DB/Settings';
import { Request, Response } from 'express';

const settingsCreate = async (req: Request, res: Response) => {
  try {
    const {  name, image, logo, cover }= req.body;
    await createSetting({  name, image, logo, cover });
    res.status(201).json({
      success: true,
      message: `Setting ${name} created.`,
    });
  } catch (e:any) {
    res.status(400).json({ error: e.message });
  }
}



const getSettingAll = async (_req:Request, res:Response) => {
  try {
    const settings = await getAllSettings();
    res.status(200).json({
      success: true,
settings
    })
  } catch (e:any) {
    res.status(400).json({ error: e.message });
  }
}

const getSettingId = async (req:Request, res:Response) => {
  try {
    const {id} = req.params;
    const setting = await getSettingById(id);
    res.json(setting);
  } catch (e:any) {
    res.status(400).json({ error: e.message });
  }
}
const settingDelete = async (req:Request, res:Response) => {
  try {
    const {id} = req.params;
    const setting = await deleteSetting(id);
    res.json(setting);
  } catch (e:any) {
    res.status(400).json({ error: e.message });
  }
}
const settingUpdate = async (req:Request, res:Response) => {
  try {
    const {id} = req.params;
    const data = req.body
    const setting = await updateSetting(id, data);
    res.json(setting);
  } catch (e:any) {
    res.status(400).json({ error: e.message });
  }
}

export {
  settingDelete,
  settingUpdate,
  getSettingAll,
  settingsCreate,
  getSettingId

}