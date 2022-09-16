import React from "react"
import User from "./user"
function Users({users, ...rest}) {

    return (
        <>
             <table className="table">
                <thead>
                    <tr>
                        <th scope="col">Имя</th>
                        <th scope="col">Качества</th>
                        <th scope="col">Профессия</th>
                        <th scope="col">Встретился, раз</th>
                        <th scope="col">Оценка</th>
                        <th scope="col">Избранное</th>
                        <th />
                    </tr>
                </thead>
                <tbody>
                    {users.map((use) => (
                        <User
                            key={use._id}
                            {...use}
                            onDelete={rest.onDelete}
                            onToggleBookMar={rest.onToggleBookMar}
                        />
                    ))}
                </tbody>
            </table>
        </>
        
    )
}

export default Users