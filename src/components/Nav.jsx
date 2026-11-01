const Nav = ({ user, loading, onLogin, onRegister, onLogout }) => {
  return (
    <nav className="nav">
      <div className="nav__actions">
        {loading ? (
          <div className="nav__skeleton" />
        ) : user ? (
          <button className="nav__avatar" onClick={onLogout} title={user.email}>
            {user.email[0].toUpperCase()}
          </button>
        ) : (
          <>
            <button className="nav__btn" onClick={onRegister}>Register</button>
            <button className="nav__btn nav__btn--primary" onClick={onLogin}>Login</button>
          </>
        )}
      </div>

      <h1 className="nav__logo">Financiply</h1>
    </nav>
  );
};

export default Nav;
