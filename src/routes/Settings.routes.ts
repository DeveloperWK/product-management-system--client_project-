import { Router } from "express";
import upload from "../config/multer.config";
import {
  getSettingAll,
  getSettingId,
  settingDelete,
  settingsCreate,
  settingUpdate,
} from "../controllers/Settings/settings.controller";

const router = Router();

router
  .post(
    "/",
    upload.fields([
      { name: "logo", maxCount: 1 },
      { name: "cover", maxCount: 1 },
      { name: "image", maxCount: 1 },
    ]),
    settingsCreate
  )
  .get("/", getSettingAll)
  .get("/:id", getSettingId)
  .patch("/:id", settingUpdate)
  .delete("/:id", settingDelete);

export default router;
