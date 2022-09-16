import React from "react"

function BookMark({ status, ...rest}){
    if(status.bookmark === false){
       return <div className="btn btn-light border border-dark" onClick={() => rest.onToggleBookMar(status._id)}><i className="bi bi-bookmark"></i></div>
    } else if (status.bookmark === true) {
        return <div className="btn btn-light border border-dark" onClick={() => rest.onToggleBookMar(status._id)}><i className="bi bi-bookmark-heart-fill"></i></div>
    }
}

export default BookMark