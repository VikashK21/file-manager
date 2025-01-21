const express = require("express");
const router = express.Router();

const upload = require("../middleware/upload");
const DirManager_Ctrller =
  new (require("../controller/directory.controller"))();

router.get("/", async (req, res, next) => {
  res.send({ message: "Ok api is working 🚀" });
});

router.get("/dir/:level", DirManager_Ctrller.getDirectoryAtLevel);
router.get("/dir/by/:ID", DirManager_Ctrller.getDirectoryByID);
router.put("/dir/update/:ID", DirManager_Ctrller.updateDirectory);
router.delete("/dir/del/:ID", DirManager_Ctrller.deleteDirectory);
router.post(
  "/dir",
  upload.single("path"),
  DirManager_Ctrller.createDirectoryAtLevel
);

module.exports = router;
