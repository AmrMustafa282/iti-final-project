import axios from "axios";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

// 1) CREATE A CONTEXT
const UsersContext = createContext();

function UsersProvider({ children }) {
 const [users, setUsers] = useState(null);
 const [currentUser, setCurrentUser] = useState(
  JSON.parse(localStorage.getItem("user")) || null
 );
 const nav = useNavigate();

 const getUsers = async () => {
  const res = await axios.get(import.meta.env.VITE_USERS_ENDPOINT);
  setUsers(res.data);
 };
 const addUesr = async (user) => {
  await axios.post(import.meta.env.VITE_USERS_ENDPOINT, user);
  getUsers();
 };
 useEffect(() => {
  getUsers();
 }, []);

 async function handleDeleteUser(id) {
  setUsers((prev) => prev.filter((user) => user.id !== id));
  await axios.delete(`${import.meta.env.VITE_USERS_ENDPOINT}/${id}`);
 }
 function handleLoginUser(user, ignore) {
  const findUser = users.find(
   (usr) =>
    usr.email === user.email &&
    usr.password === user.password &&
    usr.role === user.role
  );
  if (findUser) {
   localStorage.setItem("user", JSON.stringify(findUser));
   setCurrentUser(findUser);
   //  console.log("first", user);
   nav("/home", { replace: true });
  } else if (ignore) {
   localStorage.setItem("user", JSON.stringify(user));
   setCurrentUser(user);
   nav("/home", { replace: true });
  } else {
   throw new Error("Invalid email or password");
  }
 }
 function handleSignUp(user) {
  const findUser = users.find(
   (usr) => usr.email === user.email && usr.role === user.role
  );
  if (findUser) {
   throw new Error("this emails is already used");
  } else {
   addUesr(user);
   handleLoginUser(user, true);
  }
 }
 function handeleLogout() {
  localStorage.removeItem("user");
  setCurrentUser(null);
  // nav("/home");
 }

 const value = useMemo(() => {
  return {
   users: users?.map((item) => ({ ...item, password: undefined })),
   currentUser,
   onSignUp: handleSignUp,
   onDeleteUesr: handleDeleteUser,
   onLogin: handleLoginUser,
   onLogout: handeleLogout,
  };
 }, [
  handleSignUp,
  handleDeleteUser,
  handleLoginUser,
  handeleLogout,
  currentUser,
 ]);

 return <UsersContext.Provider value={value}>{children}</UsersContext.Provider>;
}

function useUsers() {
 const context = useContext(UsersContext);
 if (context === undefined)
  throw new Error("UsersContext was used outside of the UserProvider");
 return context;
}

export { UsersProvider, useUsers };
