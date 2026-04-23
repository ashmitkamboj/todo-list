const Todo = require("../models/Todo");

const getTodos = async (req, res) => {
    try {
        const todos = await Todo.find({ userId: req.user.id });
        res.status(200).json(todos);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const createTodo = async (req, res) => {
    try {
        if (!req.body.text) {
            return res.status(400).json({ message: "Please add a text field" });
        }
        const todo = await Todo.create({
            text: req.body.text,
            userId: req.user.id
        });
        res.status(201).json(todo);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateTodo = async (req, res) => {
    try {
        const todo = await Todo.findById(req.params.id);
        if (!todo) {
            return res.status(404).json({ message: "Todo not found" });
        }
        
        if (todo.userId.toString() !== req.user.id) {
            return res.status(401).json({ message: "User not authorized" });
        }
        
        const updatedTodo = await Todo.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
        });
        res.status(200).json(updatedTodo);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const deleteTodo = async (req, res) => {
    try {
        const todo = await Todo.findById(req.params.id);
        if (!todo) {
            return res.status(404).json({ message: "Todo not found" });
        }
        
        if (todo.userId.toString() !== req.user.id) {
            return res.status(401).json({ message: "User not authorized" });
        }
        
        await todo.deleteOne();
        res.status(200).json({ id: req.params.id });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getTodos,
    createTodo,
    updateTodo,
    deleteTodo,
};
