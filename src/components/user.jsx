import React, { useState } from "react";
import api from "../api";

function Users () {
    const [users,setUsers] = useState(api.users.fetchAll())
function displayTableHead() {
    return (
    <thead>
        <tr>
            <th scope="col">Имя</th>
            <th scope="col">Качества</th>
            <th scope="col">Профессия</th>
            <th scope="col">Встретился.раз</th>
            <th scope="col">Оценка</th>
        </tr>
    </thead>
    )
}
function tableContent(user, string) {
return <td>{user}{string}</td>
}
function getBageClasses(color) {
    let classes = 'badge m-2 '
    classes += 'bg-' + color
     return classes  
}
function hendlerDelete(id) {
    setUsers((prevState) => prevState.filter((tag) => tag._id !== id))
}

    return (
        <>
            <table className="table table-striped">
                {displayTableHead()}
            <tbody>
                {
                    users.map((user) => {
                        console.log('a', user)
                        return (
                            <tr key={user._id}>
                                {tableContent(user.name)}
                                <td>
                                    {user.qualities.map((qualiti) => {
                                        return <span className = {getBageClasses(qualiti.color)}>{qualiti.name}</span>
                                    })}
                                </td>
                                {tableContent(user.profession.name)}
                                {tableContent(user.completedMeetings)}
                                {tableContent(user.rate, '/5')}
                                <td>
                                <button type="button" className="btn btn-danger position-relative" onClick={() => hendlerDelete(user._id)}>delete</button>
                                </td>
                            </tr>
                        )
                    })
                }
            </tbody>
        </table>
      </>
    )
}

export default Users