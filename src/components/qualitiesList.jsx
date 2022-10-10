import React from "react";
import PropTypes from "prop-types";
import Qualitie from "./qualitie";

function QualitiesList({ qualities }) {
    return (
        <>
            {qualities.map((item) => (
                <Qualitie key={item._id} {...item} />
            ))}
        </>
    );
}
QualitiesList.propTypes = {
    qualities: PropTypes.array
};

export default QualitiesList;
