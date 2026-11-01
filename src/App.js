import React from "react";
import "./App.css";
import Nav from "./components/Nav";
import { auth, db } from "./firebase/init";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "firebase/auth";

function App() {
  const [user, setUser] = React.useState(null);
  const[loading, setLoading] = React.useState(true);

    React.useEffect(() => {
    let timer;

    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);

      timer = setTimeout(() => {
        setLoading(false);
      }, 300);
    });

    return () => {
      unsubscribe();
      clearTimeout(timer);
    };
  }, []);

  function register() {
    console.log("register");
    createUserWithEmailAndPassword(auth, "email@example.com", "test123")
      .then((user) => {
        console.log(user);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  function login() {
    console.log("login");
    signInWithEmailAndPassword(auth, "email@example.com", "test123")
      .then(({user}) => {
        setUser(user);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  function logout() {
    signOut(auth);
  }

  return (
    <div className="App">
      <Nav
        user={user}
        loading={loading}
        onLogin={login}
        onRegister={register}
        onLogout={logout}
      />
          </div>
  );
}

export default App;
