const express = require("express");
const router = express.Router();

const upload = require("../middleware/upload");
const DirManager_Ctrller =
  new (require("../controller/directory.controller"))();

router.get("/", async (req, res, next) => {
  res.send({ message: "Ok api is working 🚀" });
});

router.get("/dir/:level", DirManager_Ctrller.getDirectoryAtLevel);
router.put("/dir/:ID", DirManager_Ctrller.updateDirectory);
router.delete("/dir/:ID", DirManager_Ctrller.deleteDirectory);
router.post(
  "/dir",
  upload.single("path"),
  DirManager_Ctrller.createDirectoryAtLevel
);

module.exports = router;
