const express = require("express");
const router = express.Router();
const Workflow = require("../models/WorkflowModel");
const fs = require("fs");

var multer = require("multer");
const {
  filterData,
  wait,
  convertToJson,
  sendRequest,
} = require("../utils/functions");

var upload = multer({ dest: "/tmp" });

router.post("/upload", upload.single("file"), async (req, res, next) => {
  const workflowId = req.body.id;
  const filePath = req.file.path;

  let currentData;

  try {
    const workflow = await Workflow.findById(workflowId);
    if (workflow) {
      for (const step of workflow.steps) {
        switch (step.name) {
          case "Filter Data":
            await filterData(filePath);
            if (!currentData) {
              fs.readFile(filePath, (err, data) => {
                currentData = data;
              });
            }
            break;
          case "Wait":
            await wait();
            break;
          case "Convert Format":
            const data = await convertToJson(filePath);
            currentData = data;
            break;
          case "Send POST Request":
            await sendRequest(currentData);
            break;
        }
      }
      res.status(200).send("All steps completed successfully.");
    } else {
      res.status(404).json({ message: "Workflow not found" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
