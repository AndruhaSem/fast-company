import React from "react";
import UsersList from "../components/usersList";
import { useParams } from "react-router-dom";
import UserPage from "../components/userPage";

const Users = () => {
    const params = useParams();
    const { userId } = params;
    return <>{userId ? <UserPage id={userId} /> : <UsersList />}</>;
};

export default Users;
