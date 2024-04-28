const mongoose = require('mongoose');

const StepSchema = new mongoose.Schema({
    name: { type: String, required: true },
});

const WorkflowSchema = new mongoose.Schema({
    _id: { type: String, required: true },
    // name: { type: String, required: true },
    steps: [StepSchema]
});

const Workflow = mongoose.model('Workflow', WorkflowSchema);

module.exports = Workflow;