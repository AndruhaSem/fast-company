import { React, useState, useEffect } from "react";
import api from "../../../api";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";
import Qualities from "../../ui/qualitis";

const UserPage = ({ id }) => {
    const [user, setUser] = useState();
    const history = useHistory();
    useEffect(() => {
        api.users.getById(id).then((data) => setUser(data));
    }, []);

    function handleSave() {
        history.replace("/users");
    }
    if (user) {
        return (
            <div>
                <h1>{user.name}</h1>
                <h2>{user.profession.name}</h2>
                <Qualities qualities={user.qualities} />
                <p>{`completedMeetings: ${user.completedMeetings}`}</p>
                <h2>{`Rate: ${user.rate}`}</h2>
                <button onClick={() => handleSave()}>Все Пользователи</button>
            </div>
        );
    }
    return <h1>Loading</h1>;
};
UserPage.propTypes = {
    id: PropTypes.string.isRequired
};

export default UserPage;
