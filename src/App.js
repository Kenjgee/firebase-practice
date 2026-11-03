import React from "react";
import "./App.css";
import Nav from "./components/Nav";
import { auth, db } from "./firebase/init";
import {
  collection,
  addDoc,
  getDocs,
  getDoc,
  doc,
  query,
  where,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";

function App() {
  const [user, setUser] = React.useState(null);
  const [loading, setLoading] = React.useState(true);

  async function updatePost() {
    const hardcodedID = "bEEwZW7xbtZ8A5DytLX2";
    const postRef = doc(db, "posts", hardcodedID);
    const post = await getPostById(hardcodedID);
    const newPost = {
      ...post,
      title: "Land a $400k Job",
    };
    updateDoc(postRef, newPost);
  }

  function deletePost() {
    const hardcodedID = "bEEwZW7xbtZ8A5DytLX2";
    const postRef = doc(db, "posts", hardcodedID);
    deleteDoc(postRef);
  }

  function createPost() {
    const post = {
      title: "Finish interview Section",
      description: "Do Frontend Simplified",
      uid: user?.uid,
    };
    addDoc(collection(db, "posts"), post);
  }

  async function getAllPosts() {
    const { docs } = await getDocs(collection(db, "posts"));
    const posts = docs.map((elem) => ({ ...elem.data(), id: elem.id }));
    console.log(posts);
  }

  async function getPostById(id) {
    const postRef = doc(db, "posts", id);
    const postSnapshot = await getDoc(postRef);
    return postSnapshot.data();
  }

  async function getPostsByUid() {
    const postCollectionRef = await query(
      collection(db, "posts"),
      where("uid", "==", user?.uid),
    );
    const { docs } = await getDocs(postCollectionRef);
    console.log(docs.map((doc) => doc.data()));
  }

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
      .then(({ user }) => {
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
      <button onClick={createPost}>Create Post</button>
      <button onClick={getAllPosts}>Get All Posts</button>
      <button onClick={getPostById}>Get Post By ID</button>
      <button onClick={getPostsByUid}>Get Posts By UID</button>
      <button onClick={updatePost}>Update Post</button>
      <button onClick={deletePost}>Delete Post</button>
    </div>
  );
}

export default App;
