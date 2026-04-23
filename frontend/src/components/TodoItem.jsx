function TodoItem({ todo, onToggle, onDelete }) {
    return (
        <div className="todo-item">
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
        </div>
    );
}

export default TodoItem;
