import { useState, useEffect } from 'react';
import TodoForm from './components/TodoForm';
import TodoItem from './components/TodoItem';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Login from './components/Login';
import CustomCursor from './components/CustomCursor';
import { motion, AnimatePresence } from 'framer-motion';
import { fetchTodos, createTodo, updateTodo, deleteTodo } from './services/api';

function App() {
  const [todos, setTodos] = useState([]);
  const [currentFilter, setCurrentFilter] = useState('today');
  
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [userEmail, setUserEmail] = useState(localStorage.getItem('email'));

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('email');
    setToken(null);
    setUserEmail('');
    setTodos([]);
  };

  useEffect(() => {
    if (!token) return;

    const loadTodos = async () => {
      try {
        const response = await fetchTodos();
        setTodos(response.data);
      } catch (error) {
        console.error("Error fetching todos:", error);
        if (error.response?.status === 401) {
            handleLogout();
        }
      }
    };
    loadTodos();
  }, [token]);

  const handleAddTodo = async (text) => {
    try {
      const response = await createTodo(text);
      setTodos([...todos, response.data]);
    } catch (error) {
      console.error("Error creating todo:", error);
    }
  };

  const handleToggle = async (id, newCompletedStatus) => {
    try {
      const response = await updateTodo(id, newCompletedStatus);
      setTodos(todos.map(todo => (todo._id === id ? response.data : todo)));
    } catch (error) {
      console.error("Error updating todo:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteTodo(id);
      setTodos(todos.filter(todo => todo._id !== id));
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };

  const isToday = (dateString) => {
    if (!dateString) return true;
    const date = new Date(dateString);
    const today = new Date();
    return date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear();
  };

  const filteredTodos = todos.filter(todo => {
    if (currentFilter === 'completed') {
      return todo.completed;
    }
    if (todo.completed) return false;
    if (currentFilter === 'today') {
      return isToday(todo.createdAt);
    } else if (currentFilter === 'history') {
      return !isToday(todo.createdAt);
    }
    return true;
  });

  const getTitle = () => {
    if (currentFilter === 'today') return "Today's Tasks";
    if (currentFilter === 'history') return "Previous Tasks";
    if (currentFilter === 'completed') return "Completed Tasks";
  };

  if (!token) {
    return (
      <>
        <CustomCursor />
        <div className="bg-blobs">
          <div className="blob blob-1"></div>
          <div className="blob blob-2"></div>
          <div className="blob blob-3"></div>
        </div>
        <Login setToken={setToken} setUserEmail={setUserEmail} />
      </>
    );
  }

  return (
    <>
      <CustomCursor />
      <div className="bg-blobs">
        <div className="blob blob-1"></div>
        <div className="blob blob-2"></div>
        <div className="blob blob-3"></div>
      </div>
      <motion.div 
      className="dashboard-layout"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <Sidebar currentFilter={currentFilter} setCurrentFilter={setCurrentFilter} />
      
      <div className="main-content">
        <Header userEmail={userEmail} onLogout={handleLogout} />
        
        <div className="content-area">
          <div className="app-container">
            <h1 className="app-title">{getTitle()}</h1>
            
            {currentFilter === 'today' && <TodoForm onAdd={handleAddTodo} />}

            <div className="todo-list-container">
              {filteredTodos.length === 0 ? (
                <motion.p 
                  className="empty-state"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  No tasks here!
                </motion.p>
              ) : (
                <AnimatePresence mode="popLayout">
                  {filteredTodos.map(todo => (
                    <TodoItem 
                      key={todo._id} 
                      todo={todo} 
                      onToggle={handleToggle} 
                      onDelete={handleDelete} 
                    />
                  ))}
                </AnimatePresence>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  </>
  );
}

export default App;
