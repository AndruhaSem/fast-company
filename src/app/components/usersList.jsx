import React, { useState, useEffect } from "react";
import { paginate } from "../utils/paginate";
import Pagination from "./pagination";
import SearchStatus from "./searchStatus";
import api from "../api/index";
import TextField from "./textField";
import _ from "lodash";
import GroupList from "./groupList";
import PropTypes from "prop-types";
import UserTable from "./usersTable";
function UsersList() {
    const [currentPage, setCurrenPage] = useState(1);
    const [professions, setProfessions] = useState();
    const [selectedProf, setSelectedProf] = useState();
    const [data, setData] = useState({ name: "" });
    const [sortBy, setSortBy] = useState({ path: "name", order: "asc" });
    const pageSize = 8;
    const [users, setUsers] = useState();

    useEffect(() => {
        api.users.fetchAll().then((data) => setUsers(data));
    }, []);

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

    useEffect(() => {
        api.professions.fetchAll().then((data) => setProfessions(data));
    }, []);

    useEffect(() => {
        setCurrenPage(1);
    }, [selectedProf]);

    function handleProfessionSelect(item) {
        setSelectedProf(item);
        setData({ name: "" });
    }
    function handleChange({ target }) {
        setData((prevState) => ({
            ...prevState,
            [target.name]: target.value
        }));
        setSelectedProf();
    }

    const handlePageChange = (pageIndex) => {
        setCurrenPage(pageIndex);
    };

    function handleSort(item) {
        setSortBy(item);
    }

    if (users) {
        function getMatch(user, str) {
            const reg = new RegExp(str.split("").join(".*"), "i");

            return user.filter((item) => {
                if (item.name.match(reg)) {
                    return item;
                } else {
                    return false;
                }
            });
        }

        const nameUse = data ? getMatch(users, data.name) : users;
        console.log(nameUse);
        const filteredUsers = selectedProf
            ? users.filter(
                  (user) =>
                      JSON.stringify(user.profession) ===
                      JSON.stringify(selectedProf)
              )
            : nameUse;

        const count = filteredUsers.length;
        const sortedUsers = _.orderBy(
            filteredUsers,
            [sortBy.path],
            [sortBy.order]
        );
        const userCrop = paginate(sortedUsers, currentPage, pageSize);
        function clearFilter() {
            setSelectedProf();
            setData({ name: "" });
        }

        return (
            <div className="d-flex">
                {professions && (
                    <div className="d-flex flex-column flex-shrink-0 p-3">
                        <GroupList
                            items={professions}
                            onItemSelect={handleProfessionSelect}
                            selectedProf={selectedProf}
                        />
                        <button
                            className="btn btn-secondary mt-2"
                            onClick={clearFilter}
                        >
                            Очистить
                        </button>
                    </div>
                )}
                <div className="d-flex flex-column">
                    <SearchStatus lenght={count} />
                    <TextField
                        name="name"
                        value={data.name}
                        onChange={handleChange}
                        text="Search..."
                    />
                    {count > 0 && (
                        <UserTable
                            users={userCrop}
                            selectedSort={sortBy}
                            onSort={handleSort}
                            onDelete={handleDelete}
                            onToggleBookMar={handleToggleBookMar}
                        />
                    )}
                    <div className="d-flex justify-content-center">
                        <Pagination
                            itemCount={count}
                            pageSize={pageSize}
                            currentPage={currentPage}
                            onPageChange={handlePageChange}
                        />
                    </div>
                </div>
            </div>
        );
    }
    return "loging...";
}
UsersList.propTypes = {
    users: PropTypes.array
};

export default UsersList;
