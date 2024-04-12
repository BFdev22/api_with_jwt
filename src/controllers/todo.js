const { Router } = require("express"); // import Router from express
const Todo = require("../models/todo"); // import Todo model
const { isLoggedIn } = require("./middleware");

const router = Router();

router.get("/", isLoggedIn, async (req, res) => {
    try{
        const data = await Todo.find();
        res.status(200).json(data)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
});

router.get("/:id", isLoggedIn, async (req, res) => {
    try{
        const data = await Todo.findById(req.params.id);
        res.json(data)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
});
  
router.post("/", isLoggedIn, async (req, res) => {
    const data = new Todo({
        username: req.body.username,
        reminder: req.body.reminder,
        complete: req.body.complete
    })
    try {
        const dataToSave = await data.save();
        res.status(200).json(dataToSave)
    }
    catch (error) {
        res.status(400).json({message: error.message})
    }
});

router.put("/:id", isLoggedIn, async (req, res) => {
    try {
        const id = req.params.id;
        const updatedData = req.body;
        const options = { new: true };

        const result = await Todo.findByIdAndUpdate(
            id, updatedData, options
        )

        res.status(200).json(result);
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
});

router.delete("/:id", isLoggedIn, async (req, res) => {
    try {
        const id = req.params.id;
        const data = await Todo.findByIdAndDelete(id)
        res.send(`Document with ${data.username} has been deleted..`)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
});

module.exports = router