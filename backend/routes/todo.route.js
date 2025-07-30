import express from 'express'
import Todo from '../modules/todo.model.js'

const router = express.Router();

// get all todos
router.get('/', async (_req,res) => {
    try{
        const todos = await Todo.find();
        res.json(todos);
    } catch(error){
       res.status(500).json({message: error.message}) 
    }
})

// adding a new todo 
router.post('/',  async (req,res) => {
 const todo = new Todo({
  text: req.body.text
 })
 try{
    const newTodo = await todo.save();
    res.status(201).json(newTodo)
 } catch(error){
    res.status(400).json({message: error.message})
 }
})

router.patch('/:id' , async(req,res) => {
 try{
    const todo = await Todo.findById(req.params.id);
    if(!todo) return res.status(404).json({message:"Todo not found"});

    if(req.body.text !==  undefined){
        todo.text = req.body.text;
    }
    
    if(req.body.completed !== undefined){
        todo.completed = req.body.completed;
    }

    const updatedTodo = await todo.save();
    res.json(updatedTodo);
 } catch(error){
    res.status(400).json({message: error.message}); // also fixed 'err' to 'error'
 }
});


// delete the todo
router.delete('/:id', async (req, res) => {
   try{
      await Todo.findByIdAndDelete(req.params.id)
      res.json({message: "Todo Deleted"});
   } catch(error){
      res.status(500).json({message: error.message});
   }
});


export default router;

