import React from "react";

function Qualitie({ color, name, _id }) {
    return (
        <span className={"badge m-1 bg-" + color} key={_id}>
            {name}
        </span>
    );
}

export default Qualitie;
