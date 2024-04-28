const express = require('express');
const router = express.Router();
const Workflow = require('../models/WorkflowModel');

router.post('/workflows', async (req, res) => {
    try {
        const workflow = await Workflow.create(req.body);
        res.status(201).json(workflow);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

router.get('/workflows', async (req, res) => {
    try {
        const workflows = await Workflow.find();
        res.json(workflows);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.get('/workflows/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const workflow = await Workflow.findById(id);
        if (workflow) {
            res.json(workflow);
        } else {
            res.status(404).json({ message: 'Workflow not found' });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
