import React from 'react'
import "../assets/EmptyList.css"

const EmptyList = () => {
    return (
        <div className="empty-list">
            <p>You have not caught any Pokémon yet!</p>
            <p>Go to Pokédex, click on a Pokémon, and have fun!</p>
        </div>
    )
}

export default EmptyList