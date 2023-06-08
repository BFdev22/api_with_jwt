const express = require( 'express');
const router = express.Router();
const Model = require('../models/model');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { SECRET = "secret" } = process.env;

router.post('/signup', async (req, res) => {
    const data = new Model({
        name: req.body.name,
        password: req.body.password = await bcrypt.hash(req.body.password, 10)
    })
    try{
        const dataToSave = await data.save();
        res.status(200).json(dataToSave)
    } catch (error) {
        res.status(400).json({message: error.message})
    }
})

router.post('/login', async (req, res) => {
    const data = new Model({
        name: req.body.name,
        password: req.body.password
    })
    try {
        // check if the user exists
        const user = await Model.findOne({ name: req.body.name });
        if (user) {
          //check if password matches
          const result = await bcrypt.compare(req.body.password, user.password);
          if (result) {
            // sign token and send it in response
            const token = jwt.sign({ username: user.username }, SECRET);
            // res.setHeader('Authorization', 'Bearer ' + token);
            res.json({ token });
          } else {
            res.status(400).json({ error: "password doesn't match" });
          }
        } else {
          res.status(400).json({ error: "User doesn't exist" });
        }
      } catch (error) {
        res.status(400).json({message: error.message});
      }
})
//Post Method
router.post('/post', async (req, res) => {
    const data = new Model({
        name: req.body.name,
        age: req.body.age
    })

    try {
        const dataToSave = await data.save();
        res.status(200).json(dataToSave)
    }
    catch (error) {
        res.status(400).json({message: error.message})
    }
})

//Get all Method
router.get('/getAll', async (req, res) => {
    try{
        const data = await Model.find();
        res.json(data)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})

//Get by ID Method
router.get('/getOne/:id', async (req, res) => {
    try{
        const data = await Model.findById(req.params.id);
        res.json(data)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})

//Update by ID Method
router.patch('/update/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const updatedData = req.body;
        const options = { new: true };

        const result = await Model.findByIdAndUpdate(
            id, updatedData, options
        )

        res.send(result)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
})

//Delete by ID Method
//Delete by ID Method
router.delete('/delete/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const data = await Model.findByIdAndDelete(id)
        res.send(`Document with ${data.name} has been deleted..`)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
})
 
module.exports = router;