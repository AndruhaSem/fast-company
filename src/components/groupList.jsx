import React from "react";
import PropTypes from "prop-types";

const GroupList = ({
    items,
    valueProperty,
    contentProperty,
    onItemSelect,
    selectedProf
}) => {
    return (
        <ul className="list-group">
            {Object.keys(items).map((item) => (
                <li
                    className={
                        "list-group-item " +
                        (items[item] === selectedProf ? "active" : "")
                    }
                    key={items[item][valueProperty]}
                    onClick={() => onItemSelect(items[item])}
                    role="button"
                >
                    {items[item][contentProperty]}
                </li>
            ))}
        </ul>
    );
};
GroupList.defaultProps = {
    valueProperty: "_id",
    contentProperty: "name"
};
GroupList.propTypes = {
    items: PropTypes.object.isRequired,
    valueProperty: PropTypes.string.isRequired,
    contentProperty: PropTypes.string.isRequired,
    onItemSelect: PropTypes.func,
    selectedProf: PropTypes.object
};

export default GroupList;
