const express = require('express');
const router = express.Router();
const Person = require('../models/Person'); //Person model is imported into routes file 

//GET method/route to get the person
router.get('/', async (req, res) => {
    try {
        const data = await Person.find();
        console.log('person data fetched');
        res.status(200).json(data);
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ err: 'Internal server error' });
    }
});

//POST route to add a person
router.post('/', async (req, res) => {
    try {
        const data = req.body //Assuming the request body contains person data
        const newPerson = new Person(data); //Using Person model, creates an object
        //saving data in db
        const response = await newPerson.save();
        console.log('person data saved');
        res.status(200).json(response);
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ err: 'Internal server error' });
    }

});

//parameterized call
router.get('/:workType', async (req, res) => {
    try {
        const workType = req.params.workType; //extract work type from user
        if (workType == 'chef' || workType == 'manager' || workType == 'waiter') {
            const response = await Person.find({ work: workType });
            console.log('person fetched');
            res.status(200).json(response);
        }
        else {
            res.status(404).json({ error: 'invalid work type' });
        }
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ err: 'Internal server error' });
    }
});

//PUT route for person
router.put('/:id', async (req, res) => {
    try {
        const personId = req.params.id;
        const updatedPerson = req.body;
        const response = await Person.findByIdAndUpdate(personId, updatedPerson, {
            new: true, //Return the updated doc
            runValidators: true //Run Mongoose validations defined in model
        })

        if (!response) {
            return res.status(404).json({ error: 'Person not found' });
        }

        console.log('person updated');
        res.status(200).json(response);
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ err: 'Internal server error' });
    }
})

router.delete('/:id', async (req, res) => {
    try {
        const personId = req.params.id; //extract person id from URL parameter
        const response = await Person.findByIdAndDelete(personId);

        if (!response) {
            return res.status(404).json({ error: 'Person not found' });
        }

        console.log('person deleted');
        res.status(200).json({ message: 'Person Deleted Successfully' });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ err: 'Internal server error' });
    }
})


module.exports = router;

