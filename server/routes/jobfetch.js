const express = require('express');
const router = express.Router();
const Job = require('../models/Job');

//READ: Get Jobs
router.get('/', async (req, res) =>{
    try {
        const jobs = await Job.find().sort({ applyDate: -1});
        res.json(jobs);
    } catch(err) {
        res.status(500).json({message: err.message });
    }
});

//Create: New Jobs
router.post('/', async (req, res) =>{
    try{
       const { localId, ...jobData } = req.body;

        if (!localId) {
            return res.status(400).json({ message: 'localId is required' });
        }

        const job = await Job.findOneAndUpdate(
            { localId },
            { $set: {localId, ...jobData } },
            { upsert: true, new: true, runValidators: true }
        );
            
            res.status(200).json({job});
        } catch (err) {
            res.status(500).json({ Error: err.message});
        }
    }
);


//UPDATE Job
router.put('/:localId', async(req, res) => {
    try {
        const updatedJob = await Job.findOneAndUpdate(
            { localId: req.params.localId },
            req.body,
            {returnDocument: 'after', runValidators:true}
        );

        if (!updatedJob){
            return res.status(404).json({message: 'Job not found'});
            
        }

        res.json(updatedJob);
    } catch (err) {
        res.status(400).json({message: err.message });
        }
});

//DELETE Job
router.delete('/:localId', async (req, res) =>{
    try{
        const deletedJob = await Job.findOneAndDelete({ localId: req.params.localId });
        if (!deletedJob)
        {
            return res.status(404).json({message: 'Job not found'});
        }
        res.json({ message: 'Job deleted successfully.'});
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;