const DirManager = require("../schema/file-manger");

class DirManager_Ctrller {
  getDirectoryAtLevel = async (req, res) => {
    try {
      if (req.params.level) {
        const data = await DirManager.find({ level: req.params.level });
        res.json(data);
      } else {
        res.status(400).json({ message: "Level in params is required!" });
      }
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };

  createDirectoryAtLevel = async (req, res) => {
    try {
      const body = req.body;
      body.type = "folder";
      if (req.file) {
        body.path = req.file.path;
        body.type = "file";
      }
      const data = await DirManager.create(body);
      res.json(data);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };

  updateDirectory = async (req, res) => {
    try {
      const body = req.body;
      body.type = "folder";
      if (req.params.ID) {
        if (req.file) {
          body.path = req.file.path;
          body.type = "file";
        }
        const data = await DirManager.findByIdAndUpdate(
          req.params.ID,
          req.body
        );
        res.json(data);
      } else {
        res.status(400).json({ message: "Directory ID is required!" });
      }
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };

  deleteDirectory = async (req, res) => {
    try {
      if (req.params.ID) {
        const data = await DirManager.findByIdAndDelete(req.params.ID);
        const data2 = await DirManager.deleteMany({ level: req.params.ID });
        res.json({ ...data, ...data2 });
      } else {
        res.status(400).json({ message: "Directory ID is required!" });
      }
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
}

module.exports = DirManager_Ctrller;
