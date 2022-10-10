import React from "react";
import PropTypes from "prop-types";

const TableHeader = ({ onSort, selectedSort, columns }) => {
    function handleSort(item) {
        if (selectedSort.path === item) {
            onSort({
                ...selectedSort,
                order: selectedSort.order === "asc" ? "desc" : "asc"
            });
        } else {
            onSort({ path: item, order: "asc" });
        }
    }
    function name(item) {
        if (item) {
            if (selectedSort.order === "asc") {
                return "bi bi-caret-up-fill";
            } else {
                return "bi bi-caret-down-fill";
            }
        }
    }
    return (
        <thead>
            <tr>
                {Object.keys(columns).map((column) => (
                    <th
                        key={column}
                        onClick={() =>
                            columns[column].path
                                ? handleSort(columns[column].path)
                                : undefined
                        }
                        {...{ role: columns[column].path && "button" }}
                        scope="col"
                    >
                        {columns[column].name}
                        <i className={name(columns[column].path)} ></i>
                    </th>
                ))}
            </tr>
        </thead>
    );
};
TableHeader.propTypes = {
    selectedSort: PropTypes.object.isRequired,
    onSort: PropTypes.func.isRequired,
    columns: PropTypes.object.isRequired
};

export default TableHeader;
