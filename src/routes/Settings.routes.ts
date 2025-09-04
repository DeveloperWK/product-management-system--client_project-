import { Router } from 'express';
import {
  getSettingAll,
  getSettingId,
  settingDelete,
  settingsCreate,
  settingUpdate,
} from '../controllers/Settings/settings.controller';


const router = Router();


router.post("/",settingsCreate )
      .get("/", getSettingAll)
      .get("/:id", getSettingId)
      .patch("/:id", settingUpdate)
      .delete("/:id",settingDelete )

export default router;
