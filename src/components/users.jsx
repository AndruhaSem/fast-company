import React, { useState, useEffect } from "react";
import { paginate } from "../utils/paginate";
import Pagination from "./pagination";
import SearchStatus from "./searchStatus";
import api from "../api";
import _ from "lodash";
import GroupList from "./groupList";
import PropTypes from "prop-types";
import UserTable from "./usersTable";
function Users() {
    const [currentPage, setCurrenPage] = useState(1);
    const [professions, setProfessions] = useState();
    const [selectedProf, setSelectedProf] = useState();
    const [sortBy, setSortBy] = useState({ iter: "name", order: "asc" });
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
    }

    const handlePageChange = (pageIndex) => {
        setCurrenPage(pageIndex);
    };

    function handleSort(item) {
        setSortBy(item);
    }

    if (users) {
        const filteredUsers = selectedProf
            ? users.filter(
                  (user) =>
                      JSON.stringify(user.profession) ===
                      JSON.stringify(selectedProf)
              )
            : users;

        const count = filteredUsers.length;
        const sortedUsers = _.orderBy(
            filteredUsers,
            [sortBy.path],
            [sortBy.order]
        );
        const userCrop = paginate(sortedUsers, currentPage, pageSize);
        function clearFilter() {
            setSelectedProf();
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
Users.propTypes = {
    users: PropTypes.array
};

export default Users;
