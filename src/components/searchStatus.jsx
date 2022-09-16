import React from "react"

function SearchStatus({ lenght }) {
    const renderPhrase = (number) => {
            const lastOne = Number(number.toString().slice(-1))
            if (number > 4 && number < 15) return "человек тусанет"
            if ([2, 3, 4].indexOf(lastOne) >= 0) return "человека тусанут"
            if (lastOne === 1) return "человек тусанет"
            return "человек тусанет"
        }
        
    return (
        <h2>
            <span
                className={"badge " + (lenght > 0 ? "bg-primary" : "bg-danger")}
            >
                {lenght > 0
                    ? `${lenght + " " + renderPhrase(lenght)} с тобой сегодня`
                    : "Никто с тобой не тусанет"}
            </span>
        </h2>
    )
}

export default SearchStatus