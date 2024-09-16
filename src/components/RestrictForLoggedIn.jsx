import { Navigate, Outlet } from "react-router-dom";

import { useUsers } from "../context/usersContext";

export default function Restrict() {
 const { currentUser } = useUsers();

 if (currentUser) return <Outlet />;
 else return <Navigate to={"/login"} />;
}
