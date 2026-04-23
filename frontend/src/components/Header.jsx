function Header({ userEmail, onLogout }) {
  return (
    <div className="header">
      <h2>Dashboard</h2>
      <div className="login-placeholder" onClick={onLogout}>
        <div className="avatar">👤</div>
        <span>{userEmail ? userEmail.split('@')[0] : 'Logout'}</span>
      </div>
    </div>
  );
}

export default Header;
