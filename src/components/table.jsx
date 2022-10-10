import React from "react";
import PropTypes from "prop-types";
import TableHeader from "./tableHeaders";
import TableBody from "./tableBody";

const Table = ({ onSort, selectedSort, columns, data }) => {
    return (
        <table className="table">
            <TableHeader {...{ onSort, selectedSort, columns }} />
            <TableBody {...{ columns, data }} />
        </table>
    );
};
Table.propTypes = {
    data: PropTypes.array,
    onSort: PropTypes.func,
    selectedSort: PropTypes.object.isRequired,
    columns: PropTypes.object
};

export default Table;
