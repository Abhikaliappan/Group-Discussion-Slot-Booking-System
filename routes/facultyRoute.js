const express = require('express');
const router = express.Router();
const Faculty = require('../models/faculty');

// Get faculty by ID
router.post('/add', async (req, res) => {
    try {
        const { firstName, lastName, phoneNumber, department, designation, date, timings } = req.body;

        if (!firstName || !lastName || !phoneNumber || !department || !designation) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        const newFaculty = new Faculty({ firstName, lastName, phoneNumber, department, designation, date, timings });

        await newFaculty.save();
        res.status(201).json({ success: true, faculty: newFaculty });
    } catch (error) {
        res.status(500).json({ message: 'Error saving faculty', error });
    }
});


router.get('/get-all', async (req, res) => {
    try {
        const faculties = await Faculty.find(); // Fetch all faculty records
        res.status(200).json({ success: true, faculties }); // Send response
    } catch (error) {
        res.status(500).json({ success: false, message: "Error fetching faculty list", error });
    }
});

router.delete('/delete/:id', async (req, res) => {
    try {
        const faculty = await Faculty.findByIdAndDelete(req.params.id);
        if (!faculty) {
            return res.status(404).send({ success: false, message: "Faculty not found" });
        }
        res.status(200).send({ success: true, message: "Faculty deleted successfully" });
    } catch (error) {
        res.status(500).send({ success: false, message: "Error deleting faculty", error });
    }
});


module.exports = router;
