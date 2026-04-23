function Sidebar({ currentFilter, setCurrentFilter }) {
  return (
    <div className="sidebar">
      <h2 className="sidebar-title">To-Do App</h2>
      <div className="nav-menu">
        <button 
          className={`nav-button ${currentFilter === 'today' ? 'active' : ''}`}
          onClick={() => setCurrentFilter('today')}
        >
          📅 Today's Tasks
        </button>
        <button 
          className={`nav-button ${currentFilter === 'history' ? 'active' : ''}`}
          onClick={() => setCurrentFilter('history')}
        >
          🕰️ Previous Tasks
        </button>
        <button 
          className={`nav-button ${currentFilter === 'completed' ? 'active' : ''}`}
          onClick={() => setCurrentFilter('completed')}
        >
          ✅ Completed
        </button>
      </div>
    </div>
  );
}

export default Sidebar;
