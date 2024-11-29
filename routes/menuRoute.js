const express = require('express');
const router = express.Router();
const MenuItem = require('../models/MenuItem');

router.get('/', async (req, res) => {
    try {
        const data = await MenuItem.find();
        console.log('menu data fetched');
        res.status(200).json(data);
    } catch (err) {
        console.log(err);
        res.status(500).json({ err: 'Internal server error' });
    }
});

router.post('/', async (req, res) => {
    try {
        const data = req.body; //req body contain menu item now
        const newMenuItem = new MenuItem(data); //created new menu item obj
        const response = await newMenuItem.save(); //saving new menu item in db
        console.log('menu item saved');
        res.status(200).json(response);
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ err: 'Internal server error' });
    }
});

router.get('/:tasteType', async (req, res) => {
    try {
        const tasteType = req.params.tasteType;
        if (tasteType == 'spicy' || tasteType == 'sour' || tasteType == 'sweet') {
            const response = await MenuItem.find({ taste: tasteType });
            console.log('menuItem fetched');
            res.status(200).json(response);
        }
        else {
            res.status(404).json({ err: 'invalid taste type' });
        }
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ err: 'Internal server error' });
    }
})

router.put('/:id', async (req, res) => {
    try {
        const menuId = req.params.id;
        const updatedMenuItem = req.body;
        const response = await MenuItem.findByIdAndUpdate(menuId, updatedMenuItem, {
            new: true,
            runValidators: true
        })

        if (!response) {
            return res.status(404).json({ error: 'Menu item not found' });
        }

        console.log('Menu item updated');
        res.status(200).json(response);
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ err: 'Internal server error' });
    }
})

router.delete('/:id', async (req, res) => {
    try {
        const menuId = req.params.id;
        const response = await MenuItem.findByIdAndDelete(menuId);

        if (!response) {
            return res.status(404).json({ error: 'Menu item not found' });
        }

        console.log('menu item deleted');
        res.status(200).json({ message: 'Menu item deleted successfully' });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ err: 'Internal server error' });
    }
})


module.exports = router;
