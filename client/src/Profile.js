import React, { useState, useEffect } from "react";


function Profile({user, favorites, onDeleteFavorite}) {
    
    function handleDelete(favorite){
        onDeleteFavorite(favorite)
        fetch(`/stock_joins/${favorite.id}/${user.id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({user_id: user.id, stock_id: favorite.id}),
        }).then(resp => resp.json())
        .then(joinDeleteJson => {
            console.log(joinDeleteJson)
            
        })
    }
    console.log(favorites)
    
    
    return (
        <>
            <h1 className="profile">Profile</h1>
            <div className="profile-favorites">
                {favorites.map(favorite => <div className="profile-favorites-div">
                        <a href={`/explore/${favorite.ticker}`}>{favorite.ticker}</a>
                        <div>{favorite.sic_description}</div>
                        <button onClick={() => handleDelete(favorite)}>Remove</button>
                    </div>)}
            </div>
        </>
    )
}
export default Profile;