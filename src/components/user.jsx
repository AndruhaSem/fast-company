import React from "react";
import BookMark from "./bookmark";
import Qualitie from "./qualitie";

const User = (rest) => {
    return (
        <>
            <tr key={rest._id}>
                <td>{rest.name}</td>
                <td>
                    {rest.qualities.map((item) => (
                        <Qualitie key={item._id} {...item} />
                    ))}
                </td>
                <td>{rest.profession.name}</td>
                <td>{rest.completedMeetings}</td>
                <td>{rest.rate} /5</td>
                <td>
                    <BookMark
                        status={rest.bookmark}
                        onClick={() => rest.onToggleBookMar(rest._id)}
                    />
                </td>
                <td>
                    <button
                        onClick={() => rest.onDelete(rest._id)}
                        className="btn btn-danger"
                    >
                        delete
                    </button>
                </td>
            </tr>
        </>
    );
};

export default User;
