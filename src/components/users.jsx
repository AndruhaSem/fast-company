import React from "react";
import UsersList from "./usersList";
import { useParams } from "react-router-dom";
import UsersPost from "./usersPost";

const Users = () => {
    const params = useParams();
    const { userId } = params;
    return <>{userId ? <UsersPost id={userId} /> : <UsersList />}</>;
};

export default Users;
