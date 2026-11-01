import logo from "../assets/logo1.png";

const Nav = ({ user, loading, onLogin, onRegister, onLogout }) => {
  return (
    <nav className="nav">
      <img src={logo} alt="Logo" className="nav__logo" />

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
    </nav>
  );
};

export default Nav;
