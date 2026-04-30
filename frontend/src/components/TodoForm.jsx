import { useState } from "react";
import { motion } from "framer-motion";

function TodoForm({ onAdd }) {
    const [text, setText] = useState("");
    
    const handleSubmit = (e) => {
        e.preventDefault();
        if (text.trim()) {
            onAdd(text);
            setText("");
        }
    };

    return (
        <motion.form 
            onSubmit={handleSubmit} 
            className="todo-form"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
        >
            <input 
                type="text" 
                placeholder="What needs to be done?" 
                value={text} 
                onChange={(e) => setText(e.target.value)} 
                className="todo-input"
            />
            <button type="submit" className="todo-button">Add Todo</button>
        </motion.form>
    );
}

export default TodoForm;