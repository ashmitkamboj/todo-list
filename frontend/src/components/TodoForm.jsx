import { useState } from "react";

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
        <form onSubmit={handleSubmit} className="todo-form">
            <input 
                type="text" 
                placeholder="What needs to be done?" 
                value={text} 
                onChange={(e) => setText(e.target.value)} 
                className="todo-input"
            />
            <button type="submit" className="todo-button">Add Todo</button>
        </form>
    );
}

export default TodoForm;