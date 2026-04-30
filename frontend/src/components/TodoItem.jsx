import { motion } from 'framer-motion';

function TodoItem({ todo, onToggle, onDelete }) {
    return (
        <motion.div 
            className="todo-item"
            layout
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
            whileHover={{ scale: 1.01, boxShadow: "0px 8px 15px rgba(0,0,0,0.05)" }}
            transition={{ duration: 0.3 }}
        >
            <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => onToggle(todo._id, !todo.completed)}
                className="todo-checkbox"
            />
            <span className={`todo-text ${todo.completed ? 'completed' : ''}`}>
                {todo.text}
            </span>
            <button onClick={() => onDelete(todo._id)} className="delete-button">
                Delete
            </button>
        </motion.div>
    );
}

export default TodoItem;
