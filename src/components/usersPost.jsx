import { React, useState } from "react";
import api from "../api";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";

const UsersPost = ({ id }) => {
    const [users, setUsers] = useState();
    const history = useHistory();
    api.users.getById(id).then((data) => setUsers(data));

    function handleSave() {
        history.replace("/users");
    }
    if (users) {
        return (
            <div>
                <h1>{users.name}</h1>
                <h2>{users.profession.name}</h2>
                {users.qualities.map((qualiti) => (
                    <span
                        className={"badge m-1 bg-" + qualiti.color}
                        key={qualiti._id}
                    >                        {qualiti.name}
                    </span>
                ))}
                <p>{`completedMeetings: ${users.completedMeetings}`}</p>
                <h2>{`Rate: ${users.rate}`}</h2>
                <button onClick={() => handleSave()}>Все Пользователи</button>
            </div>
        );
    }
    return <h1>Loading</h1>;
};
UsersPost.propTypes = {
    id: PropTypes.string.isRequired
};

export default UsersPost;
