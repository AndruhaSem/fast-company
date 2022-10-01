import React, { useState } from "react";
import Users from "./components/users";
import api from "./api";

function App() {
    const [users, setUsers] = useState(api.users.fetchAll());

    function handleDelete(userId) {
        setUsers(users.filter((user) => user._id !== userId));
    }
    function handleToggleBookMar(id) {
        setUsers((prevState) =>
            prevState.map((user) => {
                if (user._id === id) {
                    if (user.bookmark === true) {
                        user.bookmark = false;
                    } else {
                        user.bookmark = true;
                    }
                }
                return user;
            })
        );
    }
    return (
        <>
            <Users
                onDelete={handleDelete}
                onToggleBookMar={handleToggleBookMar}
                users={users}
            />
        </>
    );
}

export default App;
